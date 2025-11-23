import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { Modal } from '@components/modal/modal';
import { OrderDetails } from '@components/order-details/order-details';

import type { TIngredient } from '@utils/types';
import type { JSX } from 'react';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): JSX.Element => {
  const bun = ingredients.find(({ type }) => type === 'bun');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  return (
    <section className={styles.burger_constructor}>
      <div className={styles.constructor_wrapper}>
        {bun && (
          <header className={styles.burger_bun}>
            <ConstructorElement
              isLocked
              price={bun.price}
              text={bun.name}
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
              text={bun.name}
              thumbnail={bun.image}
              type="bottom"
            />
          </footer>
        )}
      </div>
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
      <Modal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)}>
        <OrderDetails />
      </Modal>
    </section>
  );
};
