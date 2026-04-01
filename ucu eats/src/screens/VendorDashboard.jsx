import { useEffect, useState } from 'preact/hooks';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';

export default function VendorDashboard({ user }) {
  const [stats, setStats] = useState({ sales: 0, orders: 0, rating: 0 });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    
    const q = query(collection(db, 'orders'), where('vendorId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let totalSales = 0;
      let orderCount = 0;
      
      snapshot.docs.forEach(doc => {
        const order = doc.data();
        totalSales += order.total;
        orderCount++;
      });
      
      setStats({ sales: totalSales, orders: orderCount, rating: 4.8 });
    });
    
    return unsubscribe;
  }, [user]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#00ffff' }}>Dashboard</h2>
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <div style={{ backgroundColor: '#16213e', padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}>
          <h3 style={{ color: '#00ff88', fontSize: '2rem' }}>UGX {stats.sales.toLocaleString()}</h3>
          <p>Today's Sales</p>
        </div>
        {/* More stats cards */}
      </div>
    </div>
  );
}
