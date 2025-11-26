import { createOrder } from '@/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

export const createOrderThunk = createAsyncThunk(
  'order/createOrder',
  async (ingredientsIds: TIngredient['_id'][]) => {
    const response = await createOrder(ingredientsIds);

    return response.order;
  }
);
