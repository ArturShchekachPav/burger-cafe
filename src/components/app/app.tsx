import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';
import { BASE_URL } from '@utils/constants';

import type { TGetIngredientData, TIngredient } from '@utils/types';
import type { JSX } from 'react';

import styles from './app.module.css';

export const App = (): JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json() as Promise<TGetIngredientData>;
        }

        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      })
      .then(({ data: ingredients }) => {
        setIngredients(ingredients);
      })
      .catch((error) => {
        setIsError(true);
        console.error('Ошибка при загрузке ингредиентов:', error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {isError && (
          <p className="text text_type_main-default">
            Ошибка при загрузке ингредиентов. Пожалуйста, попробуйте позже.
          </p>
        )}
        {isLoading && !isError && <Preloader />}
        {!isLoading && !isError && (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={ingredients} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
