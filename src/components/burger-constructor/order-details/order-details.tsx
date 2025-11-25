import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';

import type { TCreateOrderData } from '@/utils/types';
import type { JSX } from 'react';

import styles from './order-details.module.css';

export function OrderDetails({
  order,
}: {
  order: TCreateOrderData['order'];
}): JSX.Element {
  return (
    <main className={styles.order_container}>
      <h2 className={`${styles.order_text} mb-8 text text_type_digits-large`}>
        {order.number}
      </h2>
      <p className={`${styles.order_text} mb-15 text text_type_main-medium`}>
        идентификатор заказа
      </p>
      <div className={`${styles.order_status} mb-15`}>
        <CheckMarkIcon type="primary" className={styles.status_icon} />
      </div>
      <p className={`${styles.order_text} text text_type_main-default mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.order_text} text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </main>
  );
}
