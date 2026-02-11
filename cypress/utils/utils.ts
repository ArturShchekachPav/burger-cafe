import type { TIngredient } from '@/types/types';

export function getIngredientPreviewSelector(ingredientId: TIngredient['_id']): string {
  return `[data-testid="ingredient-preview-${ingredientId}"]`;
}
