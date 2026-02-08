import { Modal } from '@/components/modal/modal';
import { routes } from '@/utils/constants';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { OrderDetails } from '../order-details/order-details';

import type { TLocation } from '@/types/types';
import type { JSX } from 'react';

export const OrderModal = (): JSX.Element => {
  const location = useLocation() as TLocation;
  const navigate = useNavigate();
  const orderNumber = useParams<{ orderNumber: string }>().orderNumber!;

  function handleClose(): void {
    void navigate(location.state?.background?.pathname ?? routes.USER_ORDERS);
  }

  return (
    <Modal
      title={<p className="text text_type_digits-default">#{orderNumber}</p>}
      onClose={handleClose}
    >
      <OrderDetails modal />
    </Modal>
  );
};
