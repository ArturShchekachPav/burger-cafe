import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import type { JSX, ReactPortal } from 'react';

import styles from './modal.module.css';

export function Modal({
  isOpen,
  onClose,
  children,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
  title?: string;
}): null | ReactPortal {
  function onEscapeClose(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onEscapeClose);
    }

    return (): void => {
      document.removeEventListener('keydown', onEscapeClose);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <section className={styles.modal}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.content}>
        <header className={styles.header}>
          {title && <h2 className="text text_type_main-large">{title}</h2>}
          <button onClick={onClose} className={styles.closeButton}>
            <CloseIcon type="primary" />
          </button>
        </header>
        {children}
      </div>
    </section>,
    document.body
  );
}
