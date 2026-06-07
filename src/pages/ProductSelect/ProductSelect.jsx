import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Package } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import ProductCard from '../../components/ProductCard/ProductCard';
import Button from '../../components/Button/Button';
import products, { categories } from '../../data/products';
import styles from './ProductSelect.module.css';

export default function ProductSelect() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const toggleProduct = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const handleProceed = () => {
    const selected = products.filter((p) => selectedIds.includes(p.id));
    navigate('/upload', { state: { selectedProducts: selected } });
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.content}>
        <StepIndicator currentStep={1} />

        <div className={styles.header}>
          <h1 className={styles.title}>Choose Your Products</h1>
          <p className={styles.subtitle}>
            Select one or more items to try on virtually
          </p>
        </div>

        {/* Filter chips */}
        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.chip} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
              id={`filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selected={selectedIds.includes(product.id)}
                onToggle={toggleProduct}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <Package size={48} className={styles.emptyIcon} />
            <p>No products found in this category.</p>
          </div>
        )}
      </div>

      {/* Floating proceed bar */}
      {selectedIds.length > 0 && (
        <div className={styles.proceedBar}>
          <span className={styles.selectedCount}>
            <span className={styles.countBadge}>{selectedIds.length}</span>
            item{selectedIds.length !== 1 ? 's' : ''} selected
          </span>
          <Button variant="primary" size="md" onClick={handleProceed} id="proceed-btn">
            Proceed <ArrowRight size={18} />
          </Button>
        </div>
      )}
    </div>
  );
}
