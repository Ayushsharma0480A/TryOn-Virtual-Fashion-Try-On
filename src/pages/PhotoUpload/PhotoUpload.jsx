import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowLeft, User } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import StepIndicator from '../../components/StepIndicator/StepIndicator';
import FileUploader from '../../components/FileUploader/FileUploader';
import Button from '../../components/Button/Button';
import styles from './PhotoUpload.module.css';

const SAMPLE_MODEL_URL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=700&fit=crop&crop=face';

export default function PhotoUpload() {
  const [photoData, setPhotoData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts || [];

  const handleUseSample = () => {
    setPhotoData(SAMPLE_MODEL_URL);
  };

  const handleContinue = () => {
    navigate('/tryon', {
      state: {
        selectedProducts,
        photoData,
      },
    });
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.content}>
        <StepIndicator currentStep={2} />

        <div className={styles.header}>
          <h1 className={styles.title}>Upload Your Photo</h1>
          <p className={styles.subtitle}>
            Upload a photo of yourself or use our sample model
          </p>
        </div>

        <div className={styles.uploadSection}>
          <FileUploader
            onFileSelect={setPhotoData}
            preview={photoData}
            onClear={() => setPhotoData(null)}
          />

          <div className={styles.divider}>or</div>

          <div className={styles.sampleSection}>
            <button
              className={styles.sampleBtn}
              onClick={handleUseSample}
              id="use-sample-btn"
            >
              <User size={18} />
              Use Sample Model
            </button>
          </div>
        </div>

        {/* Selected products chips */}
        {selectedProducts.length > 0 && (
          <div className={styles.selectedPreview}>
            <div className={styles.previewLabel}>
              Selected Products ({selectedProducts.length})
            </div>
            <div className={styles.previewItems}>
              {selectedProducts.map((p) => (
                <div key={p.id} className={styles.previewChip}>
                  <img src={p.image} alt={p.name} className={styles.previewChipImg} />
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className={styles.actions}>
          <Button variant="secondary" size="md" onClick={() => navigate('/products')}>
            <ArrowLeft size={18} /> Back
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleContinue}
            disabled={!photoData}
            id="continue-tryon-btn"
          >
            Continue to Try-On <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
