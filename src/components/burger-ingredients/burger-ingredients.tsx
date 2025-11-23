import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { INGREDIENTS_TYPES } from '@utils/constants';

import { IngredientsTypeSection } from './ingredients-type-section/ingredients-type-section';
import { useSectionsScroll } from './use-sections-scroll';

import type { TBurgerIngredientsProps } from '@utils/types';
import type { JSX } from 'react';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): JSX.Element => {
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
            <IngredientsTypeSection name={name} code={code} ingredients={ingredients} />
          </li>
        ))}
      </ul>
    </section>
  );
};
