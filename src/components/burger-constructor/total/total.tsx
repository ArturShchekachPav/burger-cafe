import { Modal } from '@/components/modal/modal';
import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState, type JSX } from 'react';

import { OrderDetails } from '../order-details/order-details';

import styles from './total.module.css';

export function Total(): JSX.Element {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <>
      <div className={`${styles.total} mt-10`}>
        <p className={`${styles.total_price} text text_type_main-large`}>
          610 <CurrencyIcon type="primary" className={styles.currency_icon} />
        </p>
        <Button
          htmlType="button"
          onClick={() => setIsOrderModalOpen(true)}
          size="large"
          type="primary"
        >
          Оформить заказ
        </Button>
      </div>
      {isOrderModalOpen && (
        <Modal onClose={() => setIsOrderModalOpen(false)}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
