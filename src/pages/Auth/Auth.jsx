import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Auth.module.css';

export default function Auth() {
  const { signInWithGoogle, isAuthenticated, isFirebaseConfigured } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /* If already authenticated, redirect */
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      navigate('/products');
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in was cancelled. Please try again.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Check your connection and try again.');
      } else {
        setError('Unable to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <Shield size={32} />
          </div>

          <h1 className={styles.title}>Welcome to TryOn</h1>
          <p className={styles.subtitle}>
            Sign in with your Google account to start your virtual try-on experience.
          </p>

          {error && (
            <div className={styles.error}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            className={styles.googleBtn}
            onClick={handleGoogleSignIn}
            disabled={loading}
            id="google-signin-btn"
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              <svg className={styles.googleLogo} viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>

          <div className={styles.authStatusBadge}>
            {isFirebaseConfigured ? (
              <span className={styles.statusReal}>
                <span className={styles.statusDotActive} /> Using Firebase Auth
              </span>
            ) : (
              <span className={styles.statusMock}>
                <span className={styles.statusDotDemo} /> Using local Mock Sign-In (Firebase not configured)
              </span>
            )}
          </div>

          <div className={styles.divider}>secure login</div>

          <div className={styles.infoBox}>
            <Lock size={16} color="var(--gray-500)" style={{ flexShrink: 0, marginTop: 2 }} />
            <span className={styles.infoText}>
              We only access your name and email for authentication.
              Your data is never shared with third parties.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
