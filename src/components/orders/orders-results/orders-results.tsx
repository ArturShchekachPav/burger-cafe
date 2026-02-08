import type { TOrder } from '@/types/types';
import type { JSX } from 'react';

import styles from './order-results.module.css';

export const OrdersResults = ({
  todayCount,
  totalCount,
  doneOrders,
  inWorkOrders,
}: {
  todayCount: number;
  totalCount: number;
  doneOrders: TOrder['number'][];
  inWorkOrders: TOrder['number'][];
}): JSX.Element => {
  return (
    <section className={`${styles.container} custom-scroll`}>
      <div>
        <h5 className="text text_type_main-medium mb-6">Готовы:</h5>
        <ul className={`${styles.orderNumbers}`}>
          {doneOrders
            .slice(0, doneOrders.length > 14 ? 14 : doneOrders.length)
            .map((orderNumber) => (
              <li
                key={orderNumber}
                className={`text text_type_digits-default ${styles.done}`}
              >
                {orderNumber}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h5 className="text text_type_main-medium  mb-6">В работе:</h5>
        <ul className={`${styles.orderNumbers}`}>
          {inWorkOrders
            .slice(0, inWorkOrders.length > 14 ? 14 : inWorkOrders.length)
            .map((orderNumber) => (
              <li key={orderNumber} className={`text text_type_digits-default`}>
                {orderNumber}
              </li>
            ))}
        </ul>
      </div>
      <div className={`${styles.twoColumns}`}>
        <h5 className="text text_type_main-medium">Выполнено за все время:</h5>
        <p className={`text text_type_digits-large ${styles.shadowResult}`}>
          {totalCount}
        </p>
      </div>
      <div className={`${styles.twoColumns}`}>
        <h5 className="text text_type_main-medium">Выполнено за сегодня:</h5>
        <p className={`text text_type_digits-large ${styles.shadowResult}`}>
          {todayCount}
        </p>
      </div>
    </section>
  );
};
