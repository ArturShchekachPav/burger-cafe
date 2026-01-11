import { OrderPreview } from '../order-preview/order-preview';

import type { JSX } from 'react';

import styles from './orders-list.module.css';

export const OrdersList = (): JSX.Element => {
  return (
    <ul className={`${styles.list} custom-scroll`}>
      <li>
        <OrderPreview />
      </li>
      <li>
        <OrderPreview />
      </li>
      <li>
        <OrderPreview />
      </li>
      <li>
        <OrderPreview />
      </li>
    </ul>
  );
};
