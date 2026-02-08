import { Modal } from '@/components/modal/modal';
import { routes } from '@/utils/constants';
import { useLocation, useNavigate } from 'react-router-dom';

import { IndredientDetails } from '../indredient-details/indredient-details';

import type { TLocation } from '@/types/types';
import type { JSX } from 'react';

export const IngredientModal = (): JSX.Element => {
  const location = useLocation() as TLocation;
  const navigate = useNavigate();

  function handleClose(): void {
    void navigate(location.state?.background?.pathname ?? routes.HOME);
  }

  return (
    <Modal
      title={<h2 className="text text_type_main-large">Детали ингредиента</h2>}
      onClose={handleClose}
    >
      <IndredientDetails modal />
    </Modal>
  );
};
