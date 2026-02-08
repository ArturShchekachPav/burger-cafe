import type { INGREDIENTS_TYPES } from '@utils/constants';
import type { JSX } from 'react';
import type { Location } from 'react-router-dom';

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

export type TGetIngredientsData = { success: boolean; data: TIngredient[] };

export type TGetIngredientsTranformData = {
  arr: TIngredient[];
  obj: Record<TIngredient['_id'], TIngredient>;
};

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
};

export type TModalProps = {
  onClose: () => void;
  children: JSX.Element;
  title?: string;
};

export type TCreateOrderData = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type TBurgerConstructorIngredient = TIngredient & { uuid: string };

export type TIngredientPreviewProps = {
  ingredient: TIngredient;
};

export type TApiError = {
  data: {
    success: boolean;
    message: string;
  };
  status: number;
};

export type TLocation = Location<{
  background?: Location;
  from?: Location['pathname'];
}>;

export type TForgotPasswordBody = { email: string };

export type TUpdatePasswordBody = {
  password: string;
  token: string;
};

export type TUser = {
  email: string;
  name: string;
};

export type TUserWithPassword = TUser & { password: string };

export type TAccessTokens = {
  accessToken: string;
  refreshToken: string;
};

export type TLoginBody = Pick<TUserWithPassword, 'password' | 'email'>;

export type TOrder = {
  ingredients: TIngredient['_id'][];
  _id: string;
  status: 'done' | 'created' | 'pending';
  number: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type TOrdersData = {
  success: boolean;
  orders: TOrder[];
};

export type TOrdersDataWithCounts = TOrdersData & {
  total: number;
  totalToday: number;
};

export type TSocketState<Data> = {
  data: null | Data;
  status: 'offline' | 'online' | 'connecting' | 'initializing';
  error: null | string;
};
