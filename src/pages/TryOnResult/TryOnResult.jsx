import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Download, ArrowLeft, RefreshCw, Move, ShoppingBag } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import Button from '../../components/Button/Button';
import styles from './TryOnResult.module.css';

export default function TryOnResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedProducts = [], photoData } = location.state || {};

  const canvasRef = useRef(null);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [opacity, setOpacity] = useState(75);
  const [overlayPos, setOverlayPos] = useState({ x: 0, y: 0 });
  const [overlaySize, setOverlaySize] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const activeProduct = selectedProducts[activeProductIndex];

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !activeProduct || !photoData) return;

    const ctx = canvas.getContext('2d');
    const bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';

    bgImg.onload = () => {
      /* Set canvas to image size (capped) */
      const maxW = 600;
      const scale = bgImg.width > maxW ? maxW / bgImg.width : 1;
      canvas.width = bgImg.width * scale;
      canvas.height = bgImg.height * scale;

      /* Draw background photo */
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      /* Load and draw product overlay */
      const overlayImg = new Image();
      overlayImg.crossOrigin = 'anonymous';

      overlayImg.onload = () => {
        const overlayW = canvas.width * overlaySize;
        const overlayH = (overlayImg.height / overlayImg.width) * overlayW;
        const posX = overlayPos.x + (canvas.width - overlayW) / 2;
        const posY = overlayPos.y + (canvas.height - overlayH) / 3;

        ctx.globalAlpha = opacity / 100;
        ctx.drawImage(overlayImg, posX, posY, overlayW, overlayH);
        ctx.globalAlpha = 1;
      };

      overlayImg.src = activeProduct.overlay;
    };

    bgImg.src = photoData;
  }, [photoData, activeProduct, opacity, overlayPos, overlaySize]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  /* If no data, redirect */
  if (!photoData || selectedProducts.length === 0) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.content}>
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <ShoppingBag size={48} style={{ color: 'var(--gray-300)', marginBottom: '1rem' }} />
            <h2>No try-on data</h2>
            <p style={{ color: 'var(--gray-500)', margin: '0.5rem 0 2rem' }}>
              Please select products and upload a photo first.
            </p>
            <Button variant="primary" onClick={() => navigate('/products')}>
              Go to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* Mouse handlers for dragging */
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left - overlayPos.x,
      y: e.clientY - rect.top - overlayPos.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setOverlayPos({
      x: e.clientX - rect.left - dragStart.x,
      y: e.clientY - rect.top - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  /* Touch handlers */
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    const rect = canvasRef.current.getBoundingClientRect();
    setDragStart({
      x: touch.clientX - rect.left - overlayPos.x,
      y: touch.clientY - rect.top - overlayPos.y,
    });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    setOverlayPos({
      x: touch.clientX - rect.left - dragStart.x,
      y: touch.clientY - rect.top - dragStart.y,
    });
  };

  /* Download */
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !activeProduct) return;
    const link = document.createElement('a');
    link.download = `tryon-${activeProduct.name.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  /* Reset position */
  const handleReset = () => {
    setOverlayPos({ x: 0, y: 0 });
    setOverlaySize(0.5);
    setOpacity(75);
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.content}>
        <StepIndicator currentStep={3} />

        <div className={styles.header}>
          <h1 className={styles.title}>Your Try-On Result</h1>
          <p className={styles.subtitle}>
            Drag the product overlay to reposition it. Adjust opacity and size below.
          </p>
        </div>

        <div className={styles.layout}>
          {/* Sidebar - Product list */}
          <div className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Selected Items</h3>
            <div className={styles.productList}>
              {selectedProducts.map((product, index) => (
                <button
                  key={product.id}
                  className={`${styles.productItem} ${index === activeProductIndex ? styles.active : ''}`}
                  onClick={() => {
                    setActiveProductIndex(index);
                    setOverlayPos({ x: 0, y: 0 });
                  }}
                  id={`sidebar-product-${product.id}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productItemImg}
                  />
                  <div className={styles.productItemInfo}>
                    <div className={styles.productItemName}>{product.name}</div>
                    <div className={styles.productItemCat}>{product.category}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Canvas Area */}
          <div className={styles.canvasArea}>
            <div className={styles.instruction}>
              <Move size={14} />
              Click and drag on the canvas to reposition the overlay
            </div>

            <div className={styles.canvasContainer}>
              <canvas
                ref={canvasRef}
                className={styles.canvas}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                id="tryon-canvas"
              />
            </div>

            <div className={styles.controls}>
              <div className={styles.sliderGroup}>
                <span className={styles.sliderLabel}>Opacity</span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className={styles.slider}
                  id="opacity-slider"
                />
                <span className={styles.sliderValue}>{opacity}%</span>
              </div>

              <div className={styles.sliderGroup}>
                <span className={styles.sliderLabel}>Size</span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={overlaySize * 100}
                  onChange={(e) => setOverlaySize(Number(e.target.value) / 100)}
                  className={styles.slider}
                  id="size-slider"
                />
                <span className={styles.sliderValue}>{Math.round(overlaySize * 100)}%</span>
              </div>

              <div className={styles.buttonGroup}>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RefreshCw size={16} /> Reset
                </Button>
                <Button variant="primary" size="sm" onClick={handleDownload} id="download-btn">
                  <Download size={16} /> Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <Button variant="secondary" size="md" onClick={() => navigate('/products')}>
            <ArrowLeft size={18} /> Try Different Products
          </Button>
          <Button variant="secondary" size="md" onClick={() => navigate('/upload', { state: { selectedProducts } })}>
            Upload New Photo
          </Button>
        </div>
      </div>
    </div>
  );
}
