export const api = {
  getMenu: () => fetch('http://localhost:3001/menu').then(r => r.json()),
  placeOrder: (order) => fetch('http://localhost:3001/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })
};
