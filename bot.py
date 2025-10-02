import MetaTrader5 as mt5
import time
import numpy as np
import logging
from datetime import datetime


class MT5TradingBot:
    def __init__(self, symbols, qty, stop_loss_pct=0.02, take_profit_pct=0.04, trailing_stop_pct=0.015, daily_loss_limit=50):
        if not mt5.initialize():
            print("MT5 initialization failed")
            exit(1)
        self.symbols = symbols
        self.qty = qty
        self.positions = {sym: 0 for sym in symbols}
        self.entry_prices = {sym: 0 for sym in symbols}
        self.trailing_stops = {sym: 0 for sym in symbols}
        self.trailing_highs = {sym: 0 for sym in symbols}
        self.daily_loss_limit = daily_loss_limit
        self.current_day_loss = 0
        self.stop_loss_pct = stop_loss_pct
        self.take_profit_pct = take_profit_pct
        self.trailing_stop_pct = trailing_stop_pct
        
        logging.basicConfig(filename='mt5_trading_bot.log', filemode='a', format='%(asctime)s - %(levelname)s - %(message)s', level=logging.INFO)
       
    def get_price(self, symbol):
        ticks = mt5.copy_rates_from_pos(symbol, mt5.TIMEFRAME_M1, 0, 10)
        if ticks is None or len(ticks) == 0:
            return None
        return ticks[-1]['close']   
    
    def get_position(self, symbol):
        positions = mt5.positions_get(symbol=symbol)
        if positions and len(positions) > 0:
            volume = sum([pos.volume for pos in positions])
            price = positions[0].price_open
            return volume, price
        return 0, 0
    
    def send_order(self, symbol, action, volume):
        symbol_info_tick = mt5.symbol_info_tick(symbol)
        if symbol_info_tick is None:
            logging.error(f"Tick data not available for {symbol}")
            return False
        price = symbol_info_tick.ask if action == "buy" else symbol_info_tick.bid
        request = {
            "action": mt5.TRADE_ACTION_DEAL,
            "symbol": symbol,
            "volume": volume,
            "type": mt5.ORDER_TYPE_BUY if action == "buy" else mt5.ORDER_TYPE_SELL,
            "price": price,
            "deviation": 10,
            "magic": 234000,
            "comment": "Python MT5 bot",
            "type_filling": mt5.ORDER_FILLING_RETURN,
        }
        result = mt5.order_send(request)
        if result.retcode != mt5.TRADE_RETCODE_DONE:
            logging.error(f"Order failed: {result.retcode}")
            return False
        logging.info(f"{action.capitalize()} order placed for {volume} {symbol} at {price}")
        return True
    def buy(self, symbol, volume):
        success = self.send_order(symbol, "buy", volume)
        if success:
            self.positions[symbol] += volume
            self.entry_prices[symbol] = self.get_price(symbol)
            self.trailing_highs[symbol] = self.entry_prices[symbol]
            self.trailing_stops[symbol] = self.entry_prices[symbol] * (1 - self.trailing_stop_pct)
            
    def sell(self, symbol, volume):
        success = self.send_order(symbol, "sell", volume)
        if success:
            self.positions[symbol] -= volume
            if self.positions[symbol] <= 0:
                self.positions[symbol] = 0
                self.entry_prices[symbol] = 0
                self.trailing_stops[symbol] = 0
                self.trailing_highs[symbol] = 0
    
    def check_exit_conditions(self, symbol):
        if self.positions[symbol] == 0:
            return

        current_price = self.get_price(symbol)
        if current_price is None:
            return

        # Update trailing stop if price is higher
        if current_price > self.trailing_highs[symbol]:
            self.trailing_highs[symbol] = current_price
            self.trailing_stops[symbol] = self.trailing_highs[symbol] * (1 - self.trailing_stop_pct)
            
        pnl = (current_price - self.entry_prices[symbol]) * self.positions[symbol] * mt5.symbol_info(symbol).trade_tick_value

        # Track daily losses
        if pnl < 0:
            self.current_day_loss += abs(pnl)

        # Check daily loss limit
        if self.current_day_loss >= self.daily_loss_limit:
            logging.warning("Daily loss limit reached, exiting all trades.")
            print("Daily loss limit reached, exiting all trades.")
            self.halt_trading()
            return  
        
        # Check for stop loss   
        if current_price <= self.entry_prices[symbol] * (1 - self.stop_loss_pct):
            logging.info(f"Stop loss triggered for {symbol} at {current_price}")
            print(f"Stop loss triggered for {symbol} at {current_price}")
            self.sell(symbol, self.positions[symbol])

        # Check take profit
        elif current_price >= self.entry_prices[symbol] * (1 + self.take_profit_pct):
            logging.info(f"Take profit triggered for {symbol} at {current_price}")
            print(f"Take profit triggered for {symbol} at {current_price}")
            self.sell(symbol, self.positions[symbol]) 
            
        # Check trailing stop
        elif current_price < self.trailing_stops[symbol]:
            logging.info(f"Trailing stop triggered for {symbol} at {current_price}")
            print(f"Trailing stop triggered for {symbol} at {current_price}")
            self.sell(symbol, self.positions[symbol])

    def simple_sma_strategy(self, symbol):
        rates = mt5.copy_rates_from_pos(symbol, mt5.TIMEFRAME_M1, 0, 15)
        if rates is None or len(rates) < 10:
            return
        closes = [r.close for r in rates]
        short_sma = np.mean(closes[-3:])
        long_sma = np.mean(closes[-7:])
        position, _ = self.get_position(symbol)

        if short_sma > long_sma and position == 0:
            self.buy(symbol, self.qty)
        elif short_sma < long_sma and position > 0:
            self.sell(symbol, position)  
            
    def halt_trading(self):
        for symbol in self.symbols:
            if self.positions[symbol] > 0:
                self.sell(symbol, self.positions[symbol])

    def run(self):
        logging.info(f"Starting MT5 multi-asset bot for symbols: {self.symbols}")
        print(f"Starting MT5 multi-asset bot for symbols: {self.symbols}")
        while True:
            for symbol in self.symbols:
                self.check_exit_conditions(symbol)
                self.simple_sma_strategy(symbol)
            time.sleep(60)  # Run every minute
            
    def shutdown(self):
        mt5.shutdown()


if __name__ == "__main__":
    SYMBOLS = ["BTCUSD", "XAUUSD", "USDJPY"]
    QTY = 0.01  # Example lot size; adjust per symbol and broker
    STOP_LOSS_PCT = 0.02
    TAKE_PROFIT_PCT = 0.04
    TRAILING_STOP_PCT = 0.015
    DAILY_LOSS_LIMIT = 500  # Max daily loss in USD

    bot = MT5TradingBot(SYMBOLS, QTY, STOP_LOSS_PCT,
                        TAKE_PROFIT_PCT, TRAILING_STOP_PCT, DAILY_LOSS_LIMIT)
    try:
        bot.run()
    except KeyboardInterrupt:
        print("Stopping bot...")
    finally:
        bot.shutdown()        