import { useState, useEffect } from 'preact/hooks';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('ucu_user');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock API call
    const mockUsers = [
      { id: 1, email: 'student@ucu.ac.ug', name: 'John Doe', role: 'student' },
      { id: 2, email: 'vendor@ucu.ac.ug', name: 'Tina Rolex', role: 'vendor' }
    ];
    
    const found = mockUsers.find(u => u.email === email && password === '123456');
    if (found) {
      setUser(found);
      localStorage.setItem('ucu_user', JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ucu_user');
  };

  return { user, login, logout, loading };
}
