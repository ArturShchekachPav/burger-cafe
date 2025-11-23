import { IndredientDetails } from '@/components/burger-ingredients/indredient-details/indredient-details';
import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useState, type JSX } from 'react';

import { Modal } from '@components/modal/modal';

import type { TIngredient } from '@utils/types';

import styles from './ingredient-preview.module.css';

export const IngredientPreview = (ingredient: TIngredient): JSX.Element => {
  const { name, price, image } = ingredient;
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsDetailsOpen(true)} className={styles.ingredient_preview}>
        <img
          className={`${styles.image} mb-2 pr-4 pl-4`}
          src={image}
          alt={`${name}-image`}
        />
        <p className={`${styles.price} mb-2 text text_type_digits-default`}>
          {price} <CurrencyIcon type="primary" />
        </p>
        <h3 className={`${styles.name} text text_type_main-default`}>{name}</h3>
        <Counter count={1} size="default" extraClass={styles.counter} />
      </div>
      <Modal
        title="Детали ингредиента"
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      >
        <IndredientDetails {...ingredient} />
      </Modal>
    </>
  );
};
