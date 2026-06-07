import { Check } from 'lucide-react';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, selected, onToggle }) {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''}`}
      onClick={() => onToggle(product.id)}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${selected ? 'Deselect' : 'Select'} ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(product.id);
        }
      }}
      id={`product-card-${product.id}`}
    >
      <div className={styles.imageWrap}>
        <span
          className={styles.swatch}
          style={{ backgroundColor: product.color }}
        />
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.selectOverlay}>
          <div className={styles.checkmark}>
            <Check size={24} strokeWidth={3} />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <span className={styles.price}>${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
}
