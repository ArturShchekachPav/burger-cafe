import { Modal } from '@/components/modal/modal';
import { routes } from '@/utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';

import { OrderDetails } from '../order-details/order-details';

import type { TLocation } from '@/types/types';
import type { JSX } from 'react';

export const OrderModal = (): JSX.Element => {
  const location = useLocation() as TLocation;
  const navigate = useNavigate();

  function handleClose(): void {
    void navigate(location.state?.background?.pathname ?? routes.USER_ORDERS);
  }

  return (
    <Modal title="Детали заказа" onClose={handleClose}>
      <OrderDetails modal />
    </Modal>
  );
};
