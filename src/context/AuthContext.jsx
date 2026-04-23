import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

// Our local mock database helpers
const USERS_DB_KEY = 'calmimind_users_db';
const SESSION_KEY = 'calmimind_session';

function getDbUsers() {
  try {
    const data = localStorage.getItem(USERS_DB_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveDbUser(user) {
  const users = getDbUsers();
  users.push(user);
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
}

function getSessionUser() {
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

function setSessionUser(user) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load session on startup
  useEffect(() => {
    const activeSession = getSessionUser();
    if (activeSession) {
      setUser(activeSession);
    }
    // Artificial small delay so it doesn't flash immediately
    setTimeout(() => setLoading(false), 200);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isFirebaseConfigured: true,   // Always true to bypass UI warning logic
      firebaseConfigError: '',
      
      async login(email, password) {
        setLoading(true);
        // Artificial network delay
        await new Promise((r) => setTimeout(r, 600));

        const users = getDbUsers();
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
          const sessionUser = { name: foundUser.name, email: foundUser.email };
          setSessionUser(sessionUser);
          setUser(sessionUser);
          setLoading(false);
          return { success: true };
        } else {
          setLoading(false);
          return { success: false, message: 'Incorrect email or password.' };
        }
      },

      async signup(name, email, password) {
        setLoading(true);
        await new Promise((r) => setTimeout(r, 600));
        
        const users = getDbUsers();
        if (users.find(u => u.email === email)) {
          setLoading(false);
          return { success: false, message: 'That email address is already in use.' };
        }

        const newUser = { name, email, password };
        saveDbUser(newUser);
        
        // Auto-login after signup
        const sessionUser = { name, email };
        setSessionUser(sessionUser);
        setUser(sessionUser);
        
        setLoading(false);
        return { success: true };
      },

      async logout() {
        setSessionUser(null);
        setUser(null);
      },
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
