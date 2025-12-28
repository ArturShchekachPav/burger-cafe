import { Modal } from '@/components/modal/modal';
import {
  getIsAvailableToOrder,
  getSelectedIngredientIds,
  getTotalPrice,
} from '@/services/constructor/slice';
import { useCreateOrderMutation } from '@/services/orders/api';
import { useAppSelector } from '@/services/store';
import {
  Button,
  CurrencyIcon,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, type JSX } from 'react';

import { OrderDetails } from '../order-details/order-details';

import styles from './total.module.css';

export function Total(): JSX.Element {
  const isAvailableToOrder = useAppSelector(getIsAvailableToOrder);
  const totalPrice = useAppSelector(getTotalPrice);
  const selectedIngredients = useAppSelector(getSelectedIngredientIds);

  const [createOrder, { data: order, isLoading, isError, isSuccess, reset }] =
    useCreateOrderMutation();

  const handleCreateOrder = useCallback(() => {
    void createOrder(selectedIngredients);
  }, [createOrder, selectedIngredients]);

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
          disabled={!isAvailableToOrder || isLoading}
        >
          Оформить заказ
        </Button>
      </div>
      {(isLoading || isError || isSuccess) && (
        <Modal onClose={handleOrderModalClose}>
          <>
            {isLoading && <Preloader />}
            {isError && (
              <p className="text text_type_main-default">
                Ошибка при создании заказа. Пожалуйста, попробуйте позже.
              </p>
            )}
            {isSuccess && order && <OrderDetails order={order} />}
          </>
        </Modal>
      )}
    </>
  );
}
