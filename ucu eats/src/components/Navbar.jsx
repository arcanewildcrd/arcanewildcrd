// src/components/Navbar.jsx - NO STYLE ERRORS
export default function Navbar({ currentPage, onNavigate, user, onLogout }) {
  return (
    <nav class="navbar">
      {/* Logo */}
      <div class="logo" onClick={() => onNavigate('home')}>
        UCU Eats 🔥
      </div>
      
      {/* Nav Links */}
      <div class="nav-links">
        <button 
          class={`nav-btn ${currentPage === 'menu' ? 'active' : ''}`}
          onClick={() => onNavigate('menu')}
        >
          📋 Menu
        </button>

        {user ? (
          <>
            <button 
              class={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => onNavigate('dashboard')}
            >
              📊 Dashboard
            </button>
            <span class="user-greeting">👋 {user.email?.split('@')[0]}</span>
            <button class="logout-btn" onClick={onLogout}>
              🚪 Logout
            </button>
          </>
        ) : (
          <button 
            class="login-btn"
            onClick={() => onNavigate('dashboard')}
          >
            🔐 Login
          </button>
        )}
      </div>
    </nav>
  );
}
