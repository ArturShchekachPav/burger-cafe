import { loadIngredientsThunk } from '@/services/ingredients/actions';
import { getIngredientsState } from '@/services/ingredients/slice';
import {
  getSelectedIngredient,
  resetSelectedIngredient,
} from '@/services/selected-ingredient/slice';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { Preloader, Tab } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, type JSX } from 'react';

import { INGREDIENTS_TYPES } from '@utils/constants';

import { Modal } from '../modal/modal';
import { IndredientDetails } from './indredient-details/indredient-details';
import { IngredientsTypeSection } from './ingredients-type-section/ingredients-type-section';
import { useSectionsScroll } from './use-sections-scroll';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): JSX.Element => {
  const { ingredients, isError, isLoading } = useAppSelector(getIngredientsState);
  const selectedIngredient = useAppSelector(getSelectedIngredient);
  const dispatch = useAppDispatch();

  const { activeTab, containerRef, setSectionRef, scrollToSection } =
    useSectionsScroll();

  useEffect(() => {
    void dispatch(loadIngredientsThunk());
  }, []);

  const handleIngredientDetailClose = useCallback((): void => {
    dispatch(resetSelectedIngredient());
  }, [dispatch]);

  return (
    <section className={styles.burger_ingredients}>
      <nav className="mb-10">
        <ul className={styles.menu}>
          {INGREDIENTS_TYPES.map(({ code, name }) => (
            <Tab
              key={code}
              value={code}
              active={activeTab === code}
              onClick={() => {
                scrollToSection(code);
              }}
            >
              {name}
            </Tab>
          ))}
        </ul>
      </nav>
      {isLoading && <Preloader />}
      {isError && (
        <p className="text text_type_main-default">
          Ошибка при загрузке ингредиентов. Пожалуйста, попробуйте позже.
        </p>
      )}
      {!isLoading && !isError && (
        <ul ref={containerRef} className={`${styles.types_list} custom-scroll`}>
          {INGREDIENTS_TYPES.map(({ name, code }) => (
            <li key={code} ref={setSectionRef(code)}>
              <IngredientsTypeSection
                name={name}
                code={code}
                ingredients={ingredients}
              />
            </li>
          ))}
        </ul>
      )}
      {selectedIngredient && (
        <Modal title="Детали ингредиента" onClose={handleIngredientDetailClose}>
          <IndredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
