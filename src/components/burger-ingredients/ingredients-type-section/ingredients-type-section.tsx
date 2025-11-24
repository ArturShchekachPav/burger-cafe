import { IngredientPreview } from '../ingredient-preview/ingredient-preview';

import type { TIngredientTypeSectionProps } from '@utils/types';
import type { JSX } from 'react';

import styles from './ingredients-type-section.module.css';

export function IngredientsTypeSection({
  name,
  code,
  ingredients,
  setDetailIngredient,
}: TIngredientTypeSectionProps): JSX.Element {
  return (
    <div>
      <h2 className="text text_type_main-medium mb-6">{name}</h2>
      <ul className={`${styles.ingredients_list} pl-4 pr-4`}>
        {ingredients
          .filter(({ type }) => type === code)
          .map((ingredient) => (
            <li key={ingredient._id}>
              <IngredientPreview
                onClick={() => setDetailIngredient(ingredient)}
                ingredient={ingredient}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
