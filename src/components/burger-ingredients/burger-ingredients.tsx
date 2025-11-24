import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState, type JSX } from 'react';

import { INGREDIENTS_TYPES } from '@utils/constants';

import { Modal } from '../modal/modal';
import { IndredientDetails } from './indredient-details/indredient-details';
import { IngredientsTypeSection } from './ingredients-type-section/ingredients-type-section';
import { useSectionsScroll } from './use-sections-scroll';

import type { TBurgerIngredientsProps, TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): JSX.Element => {
  const [detailIngredient, setDetailIngredient] = useState<TIngredient | null>(null);
  const { activeTab, containerRef, setSectionRef, scrollToSection } =
    useSectionsScroll();

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
      <ul ref={containerRef} className={`${styles.types_list} custom-scroll`}>
        {INGREDIENTS_TYPES.map(({ name, code }) => (
          <li key={code} ref={setSectionRef(code)}>
            <IngredientsTypeSection
              setDetailIngredient={setDetailIngredient}
              name={name}
              code={code}
              ingredients={ingredients}
            />
          </li>
        ))}
      </ul>
      {detailIngredient && (
        <Modal title="Детали ингредиента" onClose={() => setDetailIngredient(null)}>
          <IndredientDetails ingredient={detailIngredient} />
        </Modal>
      )}
    </section>
  );
};
