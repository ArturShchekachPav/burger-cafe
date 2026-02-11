import { ErrorPage } from '@/components/error-page/error-page';
import { Modal } from '@/components/modal/modal';
import { OrderAccepted } from '@/components/orders/order-accepted/order-accepted';
import {
  getIsAvailableToOrder,
  getSelectedIngredientIds,
  getTotalPrice,
} from '@/services/constructor/slice';
import { useCreateOrderMutation } from '@/services/orders/api';
import { useAppSelector } from '@/services/store';
import { useGetUserQuery } from '@/services/user/api';
import { getIsLoggedIn } from '@/services/user/slice';
import { routes } from '@/utils/constants';
import {
  Button,
  CurrencyIcon,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './total.module.css';

export function Total(): JSX.Element {
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const isAvailableToOrder = useAppSelector(getIsAvailableToOrder);
  const totalPrice = useAppSelector(getTotalPrice);
  const selectedIngredients = useAppSelector(getSelectedIngredientIds);

  const { isLoading: isUserLoading } = useGetUserQuery();
  const [createOrder, { data: order, isLoading, isError, isSuccess, reset }] =
    useCreateOrderMutation();

  const navigate = useNavigate();

  const handleCreateOrder = useCallback(() => {
    if (isLoggedIn) {
      void createOrder(selectedIngredients);
    } else {
      void navigate(routes.LOGIN, { state: { from: routes.HOME } });
    }
  }, [createOrder, selectedIngredients, isLoggedIn, navigate]);

  const handleOrderModalClose = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <>
      <div className={`${styles.total} mt-10`}>
        <p className={`${styles.total_price} text text_type_main-large`}>
          {totalPrice} <CurrencyIcon type="primary" className={styles.currency_icon} />
        </p>
        <Button
          htmlType="button"
          onClick={handleCreateOrder}
          size="large"
          type="primary"
          disabled={!isAvailableToOrder || isLoading || isUserLoading}
          data-testid="order-button"
        >
          Оформить заказ
        </Button>
      </div>
      {(isLoading || isError || isSuccess) && (
        <Modal onClose={handleOrderModalClose}>
          <>
            {isLoading && <Preloader />}
            {isError && (
              <ErrorPage
                code="500"
                content="Ошибка при создании заказа. Пожалуйста, попробуйте позже."
              />
            )}
            {isSuccess && order && <OrderAccepted order={order} />}
          </>
        </Modal>
      )}
    </>
  );
}
