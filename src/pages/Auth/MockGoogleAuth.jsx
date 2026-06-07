import { useState } from 'react';
import styles from './MockGoogleAuth.module.css';

const MOCK_ACCOUNTS = [
  {
    name: 'Sarah Jenkins',
    email: 'sarah.j@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
    color: '#A363DF'
  },
  {
    name: 'Alex Miller',
    email: 'alex.miller@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100',
    color: '#4285F4'
  },
  {
    name: 'Demo Account',
    email: 'demo.user@gmail.com',
    avatar: '', // Will generate a letter avatar
    color: '#34A853'
  }
];

export default function MockGoogleAuth() {
  const [signingIn, setSigningIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [error, setError] = useState('');

  const triggerLoginSuccess = (user) => {
    setSigningIn(true);
    setSelectedUser(user);

    // Simulate standard Google OAuth latency
    setTimeout(() => {
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'MOCK_GOOGLE_SIGNIN_SUCCESS',
            user: {
              uid: 'mock-uid-' + Math.random().toString(36).substr(2, 9),
              displayName: user.name,
              email: user.email,
              photoURL: user.avatar || null,
              emailVerified: true
            }
          },
          window.location.origin
        );
        window.close();
      } else {
        setError('Error: Parent window not found. Try closing and opening again.');
        setSigningIn(false);
      }
    }, 1200);
  };

  const handleAccountSelect = (account) => {
    if (signingIn) return;
    triggerLoginSuccess(account);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!customEmail.trim() || !customEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    triggerLoginSuccess({
      name: customName.trim(),
      email: customEmail.trim(),
      avatar: '',
      color: '#FBBC05'
    });
  };

  if (signingIn && selectedUser) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.googleLogoContainer}>
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
          </div>
          
          <div className={styles.loadingWrapper}>
            <div className={styles.spinner}></div>
            <h2 className={styles.loadingTitle}>Signing in...</h2>
            <p className={styles.loadingText}>Connecting to <strong>TryOn</strong></p>
            <div className={styles.activeAccountBrief}>
              <div 
                className={styles.briefAvatar} 
                style={{ 
                  backgroundColor: !selectedUser.avatar ? selectedUser.color : 'transparent',
                  backgroundImage: selectedUser.avatar ? `url(${selectedUser.avatar})` : 'none'
                }}
              >
                {!selectedUser.avatar && selectedUser.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.briefInfo}>
                <span className={styles.briefName}>{selectedUser.name}</span>
                <span className={styles.briefEmail}>{selectedUser.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.googleHeader}>
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
          <h1 className={styles.title}>
            {showCustomForm ? 'Sign in with Google' : 'Choose an account'}
          </h1>
          <p className={styles.subtitle}>to continue to <strong>TryOn</strong></p>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        {!showCustomForm ? (
          <div className={styles.accountList}>
            {MOCK_ACCOUNTS.map((acc, index) => (
              <button
                key={index}
                className={styles.accountRow}
                onClick={() => handleAccountSelect(acc)}
                type="button"
              >
                <div 
                  className={styles.avatar}
                  style={{ 
                    backgroundColor: !acc.avatar ? acc.color : 'transparent',
                    backgroundImage: acc.avatar ? `url(${acc.avatar})` : 'none'
                  }}
                >
                  {!acc.avatar && acc.name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.accountInfo}>
                  <span className={styles.accountName}>{acc.name}</span>
                  <span className={styles.accountEmail}>{acc.email}</span>
                </div>
              </button>
            ))}

            <button
              className={styles.useAnotherBtn}
              onClick={() => {
                setError('');
                setShowCustomForm(true);
              }}
              type="button"
            >
              <div className={styles.useAnotherIcon}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="var(--gray-600)" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </div>
              <span>Use another account</span>
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleCustomSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                className={styles.input}
                placeholder="Full Name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                autoFocus
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="email"
                className={styles.input}
                placeholder="Email address (e.g. name@gmail.com)"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
              />
            </div>
            <p className={styles.privacyNotice}>
              To simulate Google Sign-in, any name/email works. No real passwords are required.
            </p>
            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => {
                  setError('');
                  setShowCustomForm(false);
                }}
              >
                Back
              </button>
              <button type="submit" className={styles.submitBtn}>
                Next
              </button>
            </div>
          </form>
        )}

        <div className={styles.footer}>
          <span className={styles.footerText}>English (United States)</span>
          <div className={styles.footerLinks}>
            <span>Help</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
