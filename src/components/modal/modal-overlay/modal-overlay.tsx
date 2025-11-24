import type { JSX } from 'react';

import styles from './modal-overlay.module.css';

export function ModalOverlay({ onClick }: { onClick: () => void }): JSX.Element {
  return <div onClick={onClick} className={styles.overlay} />;
}
