export const BASE_URL = 'https://norma.education-services.ru/api/';

export const routes = {
  HOME: '/',
  ORDERS_FEED: '/feed',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile',
  USER_ORDERS: '/profile/orders/',
  USER_ORDER: '/profile/orders/:orderId',
  INGREDIENT: '/ingredients/:ingredientId',
  NOT_FOUND: '*',
};

export const INGREDIENTS_TYPES = [
  {
    code: 'bun',
    name: 'Булки',
  },
  {
    code: 'sauce',
    name: 'Соусы',
  },
  {
    code: 'main',
    name: 'Начинки',
  },
] as const;
