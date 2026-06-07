import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

const AuthContext = createContext(null);

// Detect if Firebase has real configuration values (not placeholders)
const isFirebaseConfigured = 
  import.meta.env.VITE_FIREBASE_API_KEY && 
  !import.meta.env.VITE_FIREBASE_API_KEY.includes('placeholder') && 
  !import.meta.env.VITE_FIREBASE_API_KEY.includes('your-api-key');

export function AuthProvider({ children }) {
  // If Firebase is not configured, load from localStorage immediately to prevent layout shifts/extra renders
  const [user, setUser] = useState(() => {
    if (!isFirebaseConfigured) {
      const savedUser = localStorage.getItem('mock_user');
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch (e) {
          console.error('Failed to parse saved user', e);
          localStorage.removeItem('mock_user');
        }
      }
    }
    return null;
  });

  // Loading state starts as true if Firebase is configured (since we need to wait for its state), otherwise false
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    if (isFirebaseConfigured) {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } else {
      return new Promise((resolve, reject) => {
        const width = 500;
        const height = 650;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const popup = window.open(
          '/mock-google-auth',
          'google_signin',
          `width=${width},height=${height},top=${top},left=${left},status=no,menubar=no,toolbar=no,scrollbars=yes,resizable=yes`
        );

        if (!popup) {
          reject(new Error('Popup blocker enabled. Please allow popups for this site.'));
          return;
        }

        const messageListener = (event) => {
          if (event.origin !== window.location.origin) return;

          if (event.data && event.data.type === 'MOCK_GOOGLE_SIGNIN_SUCCESS') {
            const userData = event.data.user;
            setUser(userData);
            localStorage.setItem('mock_user', JSON.stringify(userData));
            resolve(userData);
            cleanup();
          }
        };

        const checkClosedTimer = setInterval(() => {
          if (popup.closed) {
            reject({ code: 'auth/popup-closed-by-user' });
            cleanup();
          }
        }, 500);

        const cleanup = () => {
          clearInterval(checkClosedTimer);
          window.removeEventListener('message', messageListener);
        };

        window.addEventListener('message', messageListener);
      });
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    } else {
      setUser(null);
      localStorage.removeItem('mock_user');
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    logout,
    isAuthenticated: !!user,
    isFirebaseConfigured,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
