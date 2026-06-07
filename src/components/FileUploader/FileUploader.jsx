import { useState, useRef } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';
import Button from '../Button/Button';
import styles from './FileUploader.module.css';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function FileUploader({ onFileSelect, preview, onClear }) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Please upload a JPG or PNG image.');
      return false;
    }
    if (file.size > MAX_SIZE) {
      setError('File size must be under 10MB.');
      return false;
    }
    setError('');
    return true;
  };

  const handleFile = (file) => {
    if (validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => onFileSelect(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleBrowse = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleClear = () => {
    setError('');
    onClear();
    if (inputRef.current) inputRef.current.value = '';
  };

  if (preview) {
    return (
      <div className={styles.wrapper}>
        <div className={`${styles.zone} ${styles.hasFile}`}>
          <div className={styles.preview}>
            <img src={preview} alt="Uploaded preview" className={styles.previewImage} />
            <div className={styles.previewActions}>
              <Button variant="ghost" size="sm" onClick={handleClear}>
                <X size={16} /> Remove
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => inputRef.current?.click()}
              >
                Replace
              </Button>
            </div>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          className={styles.fileInput}
          onChange={handleBrowse}
          id="file-upload-input"
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.zone} ${dragOver ? styles.dragOver : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload image file"
        id="file-upload-zone"
      >
        <div className={styles.iconCircle}>
          <Upload size={28} />
        </div>
        <p className={styles.uploadText}>
          Drag & drop your photo here
        </p>
        <p className={styles.uploadHint}>
          or <span className={styles.browseLink}>browse files</span> · JPG, PNG up to 10MB
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className={styles.fileInput}
        onChange={handleBrowse}
        id="file-upload-input"
      />

      {error && (
        <p className={styles.error}>
          <AlertCircle size={16} /> {error}
        </p>
      )}
    </div>
  );
}
