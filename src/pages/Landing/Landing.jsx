import { useNavigate } from 'react-router-dom';
import { Sparkles, ShoppingBag, Camera, Wand2, ArrowRight, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import styles from './Landing.module.css';

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    navigate(isAuthenticated ? '/products' : '/auth');
  };

  return (
    <div className={styles.hero}>
      <Navbar transparent />

      <div className={styles.heroContent}>
        <div className={styles.heroInner}>
          {/* Text Side */}
          <div className={styles.textSide}>
            <div className={styles.badge}>
              <Sparkles size={14} />
              Virtual Try-On Experience
            </div>

            <h1 className={styles.headline}>
              See It On You <span>Before You Buy</span>
            </h1>

            <p className={styles.subtitle}>
              Experience fashion like never before. Select any product, upload your photo,
              and instantly visualize how it looks on you — all from the comfort of your screen.
            </p>

            <div className={styles.ctaGroup}>
              <Button variant="primary" size="lg" onClick={handleGetStarted}>
                Get Started <ArrowRight size={18} />
              </Button>
              <Button variant="ghost" size="lg" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Watch Demo
              </Button>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statValue}>12K+</div>
                <div className={styles.statLabel}>Try-Ons Daily</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>98%</div>
                <div className={styles.statLabel}>Satisfaction</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statValue}>500+</div>
                <div className={styles.statLabel}>Products</div>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className={styles.visualSide}>
            <div className={styles.mockupGrid}>
              <div className={styles.mockupCard}>
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop"
                  alt="Fashion model in designer outfit"
                />
              </div>
              <div className={styles.mockupCard}>
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&h=400&fit=crop"
                  alt="Fashion model in street style"
                />
              </div>
              <div className={styles.mockupCard}>
                <img
                  src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=400&fit=crop"
                  alt="Fashion model in elegant wear"
                />
              </div>
              <div className={styles.mockupCard}>
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop"
                  alt="Fashion model in casual wear"
                />
              </div>
            </div>

            {/* Floating badges */}
            <div className={styles.floatingBadge}>
              <div className={styles.floatingIcon} style={{ background: '#E8F5E9', color: '#2E7D32' }}>
                <Star size={18} />
              </div>
              <div>
                <div className={styles.floatingText}>4.9 Rating</div>
                <div className={styles.floatingTextSmall}>2,847 reviews</div>
              </div>
            </div>

            <div className={styles.floatingBadge}>
              <div className={styles.floatingIcon} style={{ background: '#F3E8FF', color: '#A363DF' }}>
                <Wand2 size={18} />
              </div>
              <div>
                <div className={styles.floatingText}>AI-Powered</div>
                <div className={styles.floatingTextSmall}>Instant results</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className={styles.features} id="features">
        <div className={styles.featuresInner}>
          <span className={styles.sectionTag}>How It Works</span>
          <h2 className={styles.sectionTitle}>Three Simple Steps</h2>
          <p className={styles.sectionSubtitle}>
            Our virtual try-on process is designed to be effortless. No downloads, no waiting — just instant style.
          </p>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <ShoppingBag size={26} />
              </div>
              <h3 className={styles.featureTitle}>Choose Products</h3>
              <p className={styles.featureDesc}>
                Browse our curated collection and select the items you want to try on.
                From blazers to accessories, find your perfect match.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Camera size={26} />
              </div>
              <h3 className={styles.featureTitle}>Upload Your Photo</h3>
              <p className={styles.featureDesc}>
                Take a selfie or upload an existing photo. Our technology works with any
                standard portrait image. Use our sample model if you prefer.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Wand2 size={26} />
              </div>
              <h3 className={styles.featureTitle}>See the Results</h3>
              <p className={styles.featureDesc}>
                Watch as the selected product is overlaid on your photo. Adjust positioning,
                try different items, and download your favorites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © {new Date().getFullYear()} TryOn — Virtual Fashion Experience. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
