import type { JSX } from 'react';

import styles from './modal-overlay.module.css';

export function ModalOverlay({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <div data-testid="modal-overlay" onClick={onClick} className={styles.overlay} />
  );
}
