import { memo, type JSX } from 'react';

import type { TIngredientPropertyProps } from '@/types/types';

import styles from './ingredient-property.module.css';

export const IngredientProperty = memo(function IngredientProperty({
  label,
  value,
}: TIngredientPropertyProps): JSX.Element {
  return (
    <div className={styles.ingredient_property}>
      <span className="text text_type_main-default text_color_inactive">{label}</span>
      <span className="text text_type_digits-default text_color_inactive">{value}</span>
    </div>
  );
});
