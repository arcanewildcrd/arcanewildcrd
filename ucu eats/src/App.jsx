import { useState, useEffect } from 'preact/hooks';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase.js';
import Navbar from './components/Navbar.jsx';
import Home from './screens/Home.jsx';
import Menu from './screens/Menu.jsx';
import VendorDashboard from './screens/VendorDashboard.jsx';
import Login from './screens/Login.jsx';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);

 // Replace your App.jsx useEffect with this SIMPLE version:
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setUser(user);
    setLoading(false);
    // Simple first-time check: new users have no displayName
    if (user && !user.displayName) {
      setIsFirstTime(true);
    } else {
      setIsFirstTime(false);
    }
  });
  return unsubscribe;
}, []);


  if (loading) {
    return <div style={{ padding: '4rem', color: 'white', textAlign: 'center' }}>Loading...</div>;
  }

  const register = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
};

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const showPage = (newPage) => setPage(newPage);

  const renderPage = () => {
  if (!user && page === 'dashboard') {
    return <Login onLogin={login} signInWithGoogle={signInWithGoogle} onRegister={register} />;
  }
    switch (page) {
      case 'home': return <Home />;
      case 'menu': return <Menu />;
      case 'dashboard': return <VendorDashboard user={user} />;
      default: return <div style={{ padding: '2rem', color: 'white' }}>Page not found</div>;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white' }}>
      <Navbar 
        currentPage={page} 
        onNavigate={showPage} 
        user={user} 
        onLogout={logout}
      />
      <main style={{ padding: '2rem' }}>{renderPage()}</main>
    </div>
  );
}
