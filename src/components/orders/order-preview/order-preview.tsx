import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { getOrderDetails } from '@/utils/utils';
import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { useMatch } from 'react-router-dom';

import type { TOrder } from '@/types/types';
import type { JSX } from 'react';

import styles from './order-preview.module.css';

export const OrderPreview = ({ order }: { order: TOrder }): JSX.Element => {
  const { data: ingredients } = useGetIngredientsQuery();
  const { totalCost, correctIngredients } = getOrderDetails(
    order,
    ingredients ? ingredients.obj : {}
  );

  const inProfile = useMatch('/profile/*');

  const statusText =
    order.status === 'done'
      ? 'Выполнен'
      : order.status === 'pending'
        ? 'Готовится'
        : order.status === 'created'
          ? 'Создан'
          : '';

  return (
    <div className={`${styles.containter}`}>
      <header className={styles.header}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </p>
      </header>
      <main>
        <h2 className="text text_type_main-medium">{order.name}</h2>
        {inProfile && (
          <p className={`text text_type_main-default ${styles.doneStatus} mt-2`}>
            {statusText}
          </p>
        )}
        <div className={`${styles.orderData} mt-6`}>
          <ul className={styles.ingredientsPreviews}>
            {correctIngredients
              .slice(0, correctIngredients.length > 6 ? 5 : correctIngredients.length)
              .map((ingredientId, index) => {
                const ingredient = ingredients?.obj[ingredientId];

                if (!ingredient) {
                  return null;
                }

                return (
                  <li
                    key={ingredientId + String(index)}
                    style={{ zIndex: order.ingredients.length - index }}
                    className={`${styles.ingredientPreviewWrapper}`}
                  >
                    <img
                      className={`${styles.ingredientPreview}`}
                      src={ingredient.image}
                      alt="ingredient-image"
                    />
                  </li>
                );
              })}
            {correctIngredients.length > 6 && (
              <li
                style={{ zIndex: 0, position: 'relative' }}
                className={`${styles.ingredientPreviewWrapper} ${styles.ingredientPreviewWrapperMore}`}
              >
                <div
                  style={{ opacity: 0.6 }}
                  className={`${styles.ingredientPreviewWrapper}`}
                >
                  <img
                    className={`${styles.ingredientPreview}`}
                    src={ingredients?.obj[correctIngredients[6]]?.image}
                    alt="ingredient-image"
                  />
                </div>
                <p className={`${styles.moreCount}`}>+{correctIngredients.length - 5}</p>
              </li>
            )}
          </ul>
          <p className={`text text_type_digits-default ${styles.cost}`}>
            {totalCost} <CurrencyIcon type="primary" />
          </p>
        </div>
      </main>
    </div>
  );
};
