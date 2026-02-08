import type { JSX } from 'react';

import styles from './orders-list.module.css';

export const OrdersList = ({ children }: { children: JSX.Element[] }): JSX.Element => {
  return <ul className={`${styles.list} custom-scroll`}>{children}</ul>;
};
