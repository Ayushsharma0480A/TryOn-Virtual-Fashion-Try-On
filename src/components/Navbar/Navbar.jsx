import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar({ transparent = false }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navClass = [
    styles.navbar,
    scrolled ? styles.scrolled : '',
    transparent && !scrolled ? styles.transparent : '',
    !transparent ? styles.solid : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={navClass} id="main-navbar">
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <Sparkles size={20} />
          </span>
          TryOn
        </Link>

        <div className={styles.navLinks}>
          {isAuthenticated && (
            <>
              <Link
                to="/products"
                className={`${styles.navLink} ${isActive('/products') ? styles.active : ''}`}
              >
                Products
              </Link>
              <Link
                to="/upload"
                className={`${styles.navLink} ${isActive('/upload') ? styles.active : ''}`}
              >
                Upload
              </Link>
            </>
          )}
        </div>

        <div className={styles.userSection}>
          {isAuthenticated && user ? (
            <div className={styles.userInfo} ref={dropdownRef}>
              <span className={styles.userName}>{user.displayName}</span>
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=A363DF&color=fff`}
                alt={user.displayName || 'User'}
                className={styles.avatar}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <button className={styles.dropdownItem} onClick={handleLogout}>
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : null}

          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && isAuthenticated && (
        <div className={styles.navLinksMobile}>
          <Link
            to="/products"
            className={`${styles.navLink} ${isActive('/products') ? styles.active : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/upload"
            className={`${styles.navLink} ${isActive('/upload') ? styles.active : ''}`}
            onClick={() => setMobileOpen(false)}
          >
            Upload
          </Link>
        </div>
      )}
    </nav>
  );
}
