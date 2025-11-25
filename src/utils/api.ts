import type { TCreateOrderData, TGetIngredientData, TIngredient } from './types';

class Api {
  private baseUrl = 'https://norma.education-services.ru/api';
  private headers = {
    'Content-Type': 'application/json',
  };

  private cheсkResponse = <T>(res: Response): Promise<T> => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  };

  public getIngredients = (): Promise<TGetIngredientData> => {
    return fetch(`${this.baseUrl}/ingredients`).then(
      this.cheсkResponse<TGetIngredientData>
    );
  };

  public createOrder = (
    ingredientsIds: TIngredient['_id'][]
  ): Promise<TCreateOrderData> => {
    return fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ ingredients: ingredientsIds }),
    }).then(this.cheсkResponse<TCreateOrderData>);
  };
}

export const { getIngredients, createOrder } = new Api();
