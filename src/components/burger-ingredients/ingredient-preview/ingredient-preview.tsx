import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';

import type { TIngredientPreviewProps } from '@utils/types';
import type { JSX } from 'react';

import styles from './ingredient-preview.module.css';

export const IngredientPreview = ({
  ingredient,
  onClick,
}: TIngredientPreviewProps): JSX.Element => {
  const { name, price, image } = ingredient;

  return (
    <div onClick={onClick} className={styles.ingredient_preview}>
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
  );
};
