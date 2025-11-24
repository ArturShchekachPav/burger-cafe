import { IngredientProperty } from '../ingredient-property/ingredient-property';

import type { TIngredient } from '@utils/types';
import type { JSX } from 'react';

import styles from './indredient-details.module.css';

export function IndredientDetails({
  ingredient: { name, image, calories, proteins, fat, carbohydrates },
}: {
  ingredient: TIngredient;
}): JSX.Element {
  return (
    <main className={styles.details_container}>
      <img
        className={`${styles.image} pl-5 pr-5 mb-4`}
        src={image}
        alt={`${name}-image`}
      />
      <h3 className={`${styles.name} text text_type_main-medium mb-8`}>{name}</h3>
      <ul className={styles.properties}>
        <li>
          <IngredientProperty label="Калории,ккал" value={calories} />
        </li>
        <li>
          <IngredientProperty label="Белки, г" value={proteins} />
        </li>
        <li>
          <IngredientProperty label="Жиры, г" value={fat} />
        </li>
        <li>
          <IngredientProperty label="Углеводы, г" value={carbohydrates} />
        </li>
      </ul>
    </main>
  );
}
