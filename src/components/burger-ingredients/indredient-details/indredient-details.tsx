import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { useParams } from 'react-router-dom';

import { IngredientProperty } from '../ingredient-property/ingredient-property';

import type { JSX } from 'react';

import styles from './indredient-details.module.css';

export function IndredientDetails(): JSX.Element {
  const {
    data: ingredientsData,
    isError,
    isLoading,
    isSuccess,
  } = useGetIngredientsQuery();
  const ingredientId = useParams<{ ingredientId: string }>().ingredientId;

  const ingredient =
    isSuccess && ingredientsData
      ? ingredientsData.data.find((item) => item._id === ingredientId)
      : null;

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  if (isError) {
    return <div>Ошибка при загрузке ингредиента. Пожалуйста, попробуйте позже.</div>;
  }

  return (
    <main className={styles.details_container}>
      <img
        className={`${styles.image} pl-5 pr-5 mb-4`}
        src={ingredient.image}
        alt={`${ingredient.name}-image`}
      />
      <h3 className={`${styles.name} text text_type_main-medium mb-8`}>
        {ingredient.name}
      </h3>
      <ul className={styles.properties}>
        <li>
          <IngredientProperty label="Калории,ккал" value={ingredient.calories} />
        </li>
        <li>
          <IngredientProperty label="Белки, г" value={ingredient.proteins} />
        </li>
        <li>
          <IngredientProperty label="Жиры, г" value={ingredient.fat} />
        </li>
        <li>
          <IngredientProperty label="Углеводы, г" value={ingredient.carbohydrates} />
        </li>
      </ul>
    </main>
  );
}
