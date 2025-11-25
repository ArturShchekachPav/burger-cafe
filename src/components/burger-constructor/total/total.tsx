import { Modal } from '@/components/modal/modal';
import {
  getIsAvailableToOrder,
  getSelectedIngredientIds,
  getTotalPrice,
} from '@/services/constructor/slice';
import { createOrderThunk } from '@/services/order/actions';
import { getOrderState, resetOrder } from '@/services/order/slice';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { Button, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, type JSX } from 'react';

import { OrderDetails } from '../order-details/order-details';

import styles from './total.module.css';

export function Total(): JSX.Element {
  const { order, isError, isLoading } = useAppSelector(getOrderState);
  const isAvailableToOrder = useAppSelector(getIsAvailableToOrder);
  const totalPrice = useAppSelector(getTotalPrice);
  const selectedIngredients = useAppSelector(getSelectedIngredientIds);
  const dispatch = useAppDispatch();

  const handleOrderModalClose = useCallback((): void => {
    dispatch(resetOrder());
  }, [dispatch]);

  const handleCreateOrder = useCallback((): void => {
    void dispatch(createOrderThunk(selectedIngredients));
  }, [dispatch, selectedIngredients]);

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
      {isError && (
        <p className="text text_type_main-default">
          Ошибка при создании заказа. Пожалуйста, попробуйте позже.
        </p>
      )}
      {order && (
        <Modal onClose={handleOrderModalClose}>
          <OrderDetails order={order} />
        </Modal>
      )}
    </>
  );
}
