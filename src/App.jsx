import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing/Landing';
import Auth from './pages/Auth/Auth';
import ProductSelect from './pages/ProductSelect/ProductSelect';
import PhotoUpload from './pages/PhotoUpload/PhotoUpload';
import TryOnResult from './pages/TryOnResult/TryOnResult';
import Admin from './pages/Admin/Admin';
import MockGoogleAuth from './pages/Auth/MockGoogleAuth';

/* Protected route wrapper */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--gray-50)',
      }}>
        <div style={{
          width: 40,
          height: 40,
          border: '3px solid var(--gray-200)',
          borderTopColor: 'var(--primary-purple)',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductSelect />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <PhotoUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tryon"
        element={
          <ProtectedRoute>
            <TryOnResult />
          </ProtectedRoute>
        }
      />
      <Route path="/admin" element={<Admin />} />
      <Route path="/mock-google-auth" element={<MockGoogleAuth />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
