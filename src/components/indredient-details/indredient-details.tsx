import type { TIngredient } from '@utils/types';
import type { JSX } from 'react';

import styles from './indredient-details.module.css';

export function IndredientDetails({
  name,
  image,
  calories,
  proteins,
  carbohydrates,
  fat,
}: TIngredient): JSX.Element {
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
          <p
            className={`${styles.property_text} text text_type_main-default text_color_inactive mb-2`}
          >
            Калории,ккал
          </p>
          <p
            className={`${styles.property_text} text text_type_main-default text_color_inactive`}
          >
            {calories}
          </p>
        </li>
        <li>
          <p
            className={`${styles.property_text} text text_type_main-default text_color_inactive mb-2`}
          >
            Белки, г
          </p>
          <p
            className={`${styles.property_text} text text_type_main-default text_color_inactive`}
          >
            {proteins}
          </p>
        </li>
        <li>
          <p
            className={`${styles.property_text} text text_type_main-default text_color_inactive mb-2`}
          >
            Жиры, г
          </p>
          <p
            className={`${styles.property_text} text text_type_main-default text_color_inactive`}
          >
            {fat}
          </p>
        </li>
        <li>
          <p
            className={`${styles.property_text} text text_type_main-default text_color_inactive mb-2`}
          >
            Углеводы, г
          </p>
          <p
            className={`${styles.property_text} text text_type_main-default text_color_inactive`}
          >
            {carbohydrates}
          </p>
        </li>
      </ul>
    </main>
  );
}
