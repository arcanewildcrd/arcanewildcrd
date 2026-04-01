// src/screens/Login.jsx - FULL REGISTER/LOGIN/GOOGLE
import { useState } from 'preact/hooks';

export default function Login({ onLogin, signInWithGoogle }) {
  const [view, setView] = useState('login'); // 'login', 'register', 'google'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Named handlers (no TypeScript errors)
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const updateName = (e) => setName(e.target.value);

  const clearError = () => setError('');

  // REGISTER NEW VENDOR
  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be 6+ characters');
      return;
    }

    try {
      setLoading(true);
      setError('');
      // onRegister will be passed from App.jsx
      await onRegister(name, email, password);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  // LOGIN EXISTING VENDOR
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onLogin(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE SIGN IN (EXISTING USERS)
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
    } catch (err) {
      setError('Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: '450px', margin: '4rem auto', padding: '2rem', 
      backgroundColor: '#16213e', borderRadius: '1rem',
      boxShadow: '0 0 30px rgba(0,255,255,0.3)'
    }}>
      
      {/* TABS */}
      <div style={{ 
        display: 'flex', gap: '0.5rem', marginBottom: '2rem', 
        backgroundColor: '#1a1a2e', borderRadius: '0.5rem', padding: '0.2rem'
      }}>
        <button 
          onClick={() => { setView('login'); clearError(); }}
          style={{ 
            flex: 1, padding: '1rem', borderRadius: '0.4rem',
            backgroundColor: view === 'login' ? '#00ffff' : 'transparent',
            color: view === 'login' ? '#000' : '#ffffff99',
            border: 'none', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          Login
        </button>
        <button 
          onClick={() => { setView('register'); clearError(); }}
          style={{ 
            flex: 1, padding: '1rem', borderRadius: '0.4rem',
            backgroundColor: view === 'register' ? '#00ff88' : 'transparent',
            color: view === 'register' ? '#000' : '#ffffff99',
            border: 'none', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          Sign Up
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div style={{ 
          color: '#ff4444', backgroundColor: '#ff444420', 
          padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' 
        }}>
          {error}
        </div>
      )}

      {/* REGISTER FORM */}
      {view === 'register' && (
        <>
          <input
            type="text"
            placeholder="Vendor Name (e.g. Chapati Queen)"
            value={name}
            onInput={updateName}
            disabled={loading}
            style={{ 
              width: '100%', padding: '1rem', marginBottom: '1rem', 
              borderRadius: '0.5rem', border: '1px solid #00ff88',
              backgroundColor: '#1a1a2e', color: 'white' 
            }}
          />
          <input
            type="email"
            placeholder="vendor@ucueats.com"
            value={email}
            onInput={updateEmail}
            disabled={loading}
            style={{ 
              width: '100%', padding: '1rem', marginBottom: '1rem', 
              borderRadius: '0.5rem', border: '1px solid #00ff88',
              backgroundColor: '#1a1a2e', color: 'white' 
            }}
          />
          <input
            type="password"
            placeholder="Password (6+ chars)"
            value={password}
            onInput={updatePassword}
            disabled={loading}
            style={{ 
              width: '100%', padding: '1rem', marginBottom: '1rem', 
              borderRadius: '0.5rem', border: '1px solid #00ff88',
              backgroundColor: '#1a1a2e', color: 'white' 
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onInput={updateConfirmPassword}
            disabled={loading}
            style={{ 
              width: '100%', padding: '1rem', marginBottom: '1.5rem', 
              borderRadius: '0.5rem', border: '1px solid #00ff88',
              backgroundColor: '#1a1a2e', color: 'white' 
            }}
          />
          <button 
            onClick={handleRegister}
            disabled={loading}
            style={{ 
              width: '100%', padding: '1.2rem', 
              backgroundColor: loading ? '#666' : '#00ff88', 
              color: '#000', border: 'none', borderRadius: '0.5rem',
              fontSize: '1.1rem', fontWeight: 'bold', 
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </>
      )}

      {/* LOGIN FORM */}
      {view === 'login' && (
        <>
          <input
            type="email"
            placeholder="vendor@ucueats.com"
            value={email}
            onInput={updateEmail}
            disabled={loading}
            style={{ 
              width: '100%', padding: '1rem', marginBottom: '1rem', 
              borderRadius: '0.5rem', border: '1px solid #00ffff',
              backgroundColor: '#1a1a2e', color: 'white' 
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onInput={updatePassword}
            disabled={loading}
            style={{ 
              width: '100%', padding: '1rem', marginBottom: '1.5rem', 
              borderRadius: '0.5rem', border: '1px solid #00ffff',
              backgroundColor: '#1a1a2e', color: 'white' 
            }}
          />
          <button 
            onClick={handleLogin}
            disabled={loading}
            style={{ 
              width: '100%', padding: '1.2rem', 
              backgroundColor: loading ? '#666' : '#00ffff', 
              color: '#000', border: 'none', borderRadius: '0.5rem',
              fontSize: '1.1rem', fontWeight: 'bold', 
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </>
      )}

      {/* GOOGLE BUTTON (Always visible) */}
      <div style={{ textAlign: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #00ffff33' }}>
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{ 
            padding: '1rem 2rem', 
            backgroundColor: loading ? '#666' : '#4285f4', 
            color: 'white', border: 'none', borderRadius: '0.5rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem', fontWeight: '500'
          }}
        >
          {loading ? 'Loading...' : 'Sign in with Google'}
        </button>
        <p style={{ color: '#ffffff66', fontSize: '0.9rem', marginTop: '1rem' }}>
          For existing Google accounts
        </p>
      </div>
    </div>
  );
}
