import { getIngredientsCount } from '@/services/constructor/slice';
import { useAppSelector } from '@/services/store';

import type { TIngredient } from '@/types/types';

export const useIngredientCount = (ingredientId: TIngredient['_id']): number => {
  const ingredientsCount = useAppSelector(getIngredientsCount);

  return ingredientsCount[ingredientId] || 0;
};
