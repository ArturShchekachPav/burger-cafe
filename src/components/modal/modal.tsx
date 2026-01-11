import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalOverlay } from './modal-overlay/modal-overlay';

import type { TModalProps } from '@/types/types';
import type { ReactPortal } from 'react';

import styles from './modal.module.css';

export function Modal({ onClose, children, title }: TModalProps): null | ReactPortal {
  useEffect(() => {
    function onEscapeClose(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', onEscapeClose);

    return (): void => {
      document.removeEventListener('keydown', onEscapeClose);
    };
  }, []);

  return createPortal(
    <section className={styles.modal}>
      <ModalOverlay onClick={onClose} />
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
    document.getElementById('modals')!
  );
}
