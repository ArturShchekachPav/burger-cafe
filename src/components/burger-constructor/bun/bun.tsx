import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredient } from '@/utils/types';
import type { JSX } from 'react';

import styles from './bun.module.css';

export function Bun({
  bun,
  type = 'top',
}: {
  bun: TIngredient;
  type: 'top' | 'bottom';
}): JSX.Element {
  const postfix = type === 'top' ? 'верх' : 'низ';

  const element = (
    <ConstructorElement
      isLocked
      price={bun.price}
      text={`${bun.name} (${postfix})`}
      thumbnail={bun.image}
      type={type}
    />
  );

  return type === 'top' ? (
    <header className={styles.burger_bun}>{element}</header>
  ) : (
    <footer className={styles.burger_bun}>{element}</footer>
  );
}
