export default function Menu() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#00ffff' }}>
        Food Menu
      </h2>
      <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px' }}>
        <div style={{ 
          backgroundColor: '#16213e', 
          padding: '2rem', 
          borderRadius: '1rem'
        }}>
          <h3 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Chapati & Beef</h3>
          <p style={{ fontSize: '1.2rem', margin: 0 }}>UGX 5,000</p>
        </div>
        <div style={{ 
          backgroundColor: '#16213e', 
          padding: '2rem', 
          borderRadius: '1rem'
        }}>
          <h3 style={{ color: '#00ffff', marginBottom: '0.5rem' }}>Matooke</h3>
          <p style={{ fontSize: '1.2rem', margin: 0 }}>UGX 8,000</p>
        </div>
      </div>
    </div>
  );
}
