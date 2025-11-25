import { getIngredients } from '@/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadIngredientsThunk = createAsyncThunk(
  'ingredients/loadIngredients',
  async () => {
    const response = await getIngredients();

    return response.data;
  }
);
