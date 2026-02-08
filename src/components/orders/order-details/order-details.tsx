import { ErrorPage } from '@/components/error-page/error-page';
import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { routes } from '@/utils/constants';
import { getOrderDetails } from '@/utils/utils';
import { CurrencyIcon, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import { useOrderSearch } from '../useOrderSearch';

import type { JSX } from 'react';

import styles from './order-details.module.css';

const PreloaderScreen = (
  <div style={{ margin: 'auto' }} className="pt-25 pb-25">
    <Preloader />
  </div>
);

const NotFoundScreen = <ErrorPage code="404" content="Заказ не найден" backlinkTo="/" />;

const ErrorScreen = (
  <ErrorPage
    code="500"
    content="Ошибка при загрузке заказа. Пожалуйста, попробуйте позже"
    backlinkTo={routes.HOME}
  />
);

export const OrderDetails = ({ modal }: { modal?: boolean }): JSX.Element | null => {
  const orderNumber = useParams<{ orderNumber: string }>().orderNumber;

  const {
    isSearching,
    order,
    isError: orderError,
  } = useOrderSearch(Number(orderNumber));
  const {
    data: ingredients,
    isLoading: ingredientsLoading,
    isError: ingredientsError,
  } = useGetIngredientsQuery();

  const isLoading = isSearching || ingredientsLoading;
  const hasError = orderError || ingredientsError;

  if (isLoading) return PreloaderScreen;

  if (hasError) return ErrorScreen;

  if (!order) return NotFoundScreen;

  const ingredientsData = getOrderDetails(order, ingredients ? ingredients.obj : {});

  if (ingredientsData.totalCost === 0) return ErrorScreen;

  const Heading = modal ? 'h3' : 'h1';
  const statusText =
    order.status === 'done'
      ? 'Выполнен'
      : order.status === 'pending'
        ? 'Готовится'
        : order.status === 'created'
          ? 'Создан'
          : '';

  return (
    <div className={`${styles.container}`}>
      {!modal && (
        <p className={`text_type_digits-default ${styles.number}`}>#{order.number}</p>
      )}
      <Heading className={`text text_type_main-medium mb-2 ${modal ? 'mt-5' : 'mt-10'}`}>
        {order.name}
      </Heading>
      <p
        className={`text text_type_main-default mb-15 ${order.status === 'done' ? styles.status : ''}`}
      >
        {statusText}
      </p>
      <section className="mb-10">
        <h4 className="text text_type_main-medium mb-6">Состав:</h4>
        <ul className={`custom-scroll ${styles.ingredients}`}>
          {Object.entries(ingredientsData.ingredientsCounts).map(
            ([ingredientId, count]) => {
              const ingredient = ingredients?.obj[ingredientId];
              if (!ingredient) return null;

              return (
                <li key={ingredientId} className={`${styles.ingredient}`}>
                  <div className={`${styles.ingredientPreviewWrapper}`}>
                    <img
                      className={`${styles.ingredientPreview}`}
                      src={ingredient.image}
                      alt="ingredient-image"
                    />
                  </div>
                  <h5 className="text text_type_main-default">{ingredient.name}</h5>
                  <p
                    style={{ marginLeft: 'auto' }}
                    className={`text text_type_digits-default ${styles.cost}`}
                  >
                    {count} x {ingredient.price} <CurrencyIcon type="primary" />
                  </p>
                </li>
              );
            }
          )}
        </ul>
      </section>
      <section className={`${styles.info}`}>
        <p className="text text_type_main-default text_color_inactive">Вчера, 13:50</p>
        <p className={`text text_type_digits-default ${styles.cost}`}>
          {ingredientsData.totalCost} <CurrencyIcon type="primary" />
        </p>
      </section>
    </div>
  );
};
