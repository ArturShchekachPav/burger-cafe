import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';

import { Total } from '@components/burger-constructor/total/total';

import type { TBurgerConstructorProps } from '@utils/types';
import type { JSX } from 'react';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): JSX.Element => {
  const bun = ingredients.find(({ type }) => type === 'bun');

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.constructor_wrapper}>
        {bun && (
          <header className={styles.burger_bun}>
            <ConstructorElement
              isLocked
              price={bun.price}
              text={`${bun.name} (верх)`}
              thumbnail={bun.image}
              type="top"
            />
          </header>
        )}
        <ul className={`${styles.burger_ingredients} custom-scroll`}>
          {ingredients
            .filter(({ type }) => type !== 'bun')
            .map(({ _id, price, name, image }) => (
              <li className={styles.burger_ingredient} key={_id}>
                <button className={styles.drag_button}>
                  <DragIcon type="primary" />
                </button>
                <ConstructorElement
                  handleClose={console.log}
                  price={price}
                  text={name}
                  thumbnail={image}
                />
              </li>
            ))}
        </ul>
        {bun && (
          <footer className={styles.burger_bun}>
            <ConstructorElement
              isLocked
              price={bun.price}
              text={`${bun.name} (низ)`}
              thumbnail={bun.image}
              type="bottom"
            />
          </footer>
        )}
      </div>
      <Total />
    </section>
  );
};
