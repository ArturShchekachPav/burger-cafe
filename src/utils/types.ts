import type { INGREDIENTS_TYPES } from '@utils/constants';

export type TIngredient = {
  _id: string;
  name: string;
  type: (typeof INGREDIENTS_TYPES)[number]['code'];
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};
