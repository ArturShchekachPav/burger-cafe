import type { INGREDIENTS_TYPES } from '@utils/constants';
import type { JSX } from 'react';

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

export type TGetIngredientData = { success: boolean; data: TIngredient[] };

export type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export type TIngredientPropertyProps = {
  label: string;
  value: number;
};

export type TIngredientTypeSectionProps = {
  name: string;
  code: string;
  ingredients: TIngredient[];
  setDetailIngredient: (ingredient: TIngredient) => void;
};

export type TModalProps = {
  onClose: () => void;
  children: JSX.Element;
  title?: string;
};

export type TIngredientPreviewProps = {
  ingredient: TIngredient;
  onClick: () => void;
};
