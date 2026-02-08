import { ErrorPage } from '@/components/error-page/error-page';
import { useGetIngredientsQuery } from '@/services/ingredients/api';
import { routes } from '@/utils/constants';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import { IngredientProperty } from '../ingredient-property/ingredient-property';

import type { JSX } from 'react';

import styles from './indredient-details.module.css';

export function IndredientDetails({ modal }: { modal?: boolean }): JSX.Element {
  const { data: ingredientsData, isError, isLoading } = useGetIngredientsQuery();

  const ingredientId = useParams<{ ingredientId: string }>().ingredientId;

  const ingredient =
    ingredientId && ingredientsData ? ingredientsData.obj[ingredientId] : undefined;

  if (isLoading) {
    return (
      <div style={{ margin: 'auto' }} className="pt-25 pb-25">
        <Preloader />
      </div>
    );
  }

  if (!ingredient) {
    return <ErrorPage code="404" content="Ингредиент не найден" backlinkTo="/" />;
  }

  if (isError) {
    return (
      <ErrorPage
        code="500"
        content="Ошибка при загрузке ингредиента. Пожалуйста, попробуйте позже"
        backlinkTo={routes.HOME}
      />
    );
  }

  const Heading = modal ? 'h3' : 'h1';

  return (
    <div className={styles.details_container}>
      {!modal && (
        <h2 className={`${styles.title} text text_type_main-large`}>
          Детали ингредиента
        </h2>
      )}
      <img
        className={`${styles.image} pl-5 pr-5 mb-4`}
        src={ingredient.image}
        alt={`${ingredient.name}-image`}
      />
      <Heading className={`${styles.name} text text_type_main-medium mb-8`}>
        {ingredient.name}
      </Heading>
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
    </div>
  );
}
