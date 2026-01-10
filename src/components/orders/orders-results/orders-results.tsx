import type { JSX } from 'react';

import styles from './order-results.module.css';

export const OrdersResults = (): JSX.Element => {
  return (
    <section className={`${styles.container}`}>
      <div>
        <h5 className="text text_type_main-medium mb-6">Готовы:</h5>
        <ul className={`${styles.orderNumbers}`}>
          <li className={`text text_type_digits-default ${styles.inWork}`}>034533</li>
          <li className={`text text_type_digits-default ${styles.inWork}`}>034532</li>
          <li className={`text text_type_digits-default ${styles.inWork}`}>034530</li>
          <li className={`text text_type_digits-default ${styles.inWork}`}>034527</li>
          <li className={`text text_type_digits-default ${styles.inWork}`}>034525</li>
        </ul>
      </div>
      <div>
        <h5 className="text text_type_main-medium  mb-6">В работе:</h5>
        <ul className={`${styles.orderNumbers}`}>
          <li className="text text_type_digits-default">034538</li>
          <li className="text text_type_digits-default">034541</li>
          <li className="text text_type_digits-default">034542</li>
        </ul>
      </div>
      <div className={`${styles.twoColumns}`}>
        <h5 className="text text_type_main-medium">Выполнено за все время:</h5>
        <p className={`text text_type_digits-large ${styles.shadowResult}`}>28 752</p>
      </div>
      <div className={`${styles.twoColumns}`}>
        <h5 className="text text_type_main-medium">Выполнено за сегодня:</h5>
        <p className={`text text_type_digits-large ${styles.shadowResult}`}>138</p>
      </div>
    </section>
  );
};
