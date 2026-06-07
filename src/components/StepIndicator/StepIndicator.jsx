import { Check } from 'lucide-react';
import styles from './StepIndicator.module.css';

const STEPS = [
  { label: 'Select Products', number: 1 },
  { label: 'Upload Photo', number: 2 },
  { label: 'Try On', number: 3 },
];

export default function StepIndicator({ currentStep = 1 }) {
  return (
    <div className={styles.stepper} role="navigation" aria-label="Progress">
      {STEPS.map((step, index) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;

        return (
          <div key={step.number} className={styles.step}>
            <div
              className={`${styles.stepCircle} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
            >
              {isCompleted ? <Check size={18} strokeWidth={3} /> : step.number}
            </div>
            <span
              className={`${styles.stepLabel} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
            >
              {step.label}
            </span>
            {index < STEPS.length - 1 && (
              <div
                className={`${styles.connector} ${isCompleted ? styles.filled : ''}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
