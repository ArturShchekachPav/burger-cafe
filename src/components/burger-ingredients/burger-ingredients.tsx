import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState, useCallback } from 'react';

import { IngredientPreview } from '@components/burger-ingredients/ingredient-preview/ingredient-preview';
import { INGREDIENTS_TYPES } from '@utils/constants';

import type { TIngredient } from '@utils/types';
import type { JSX } from 'react';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<(typeof INGREDIENTS_TYPES)[number]['code']>(
    INGREDIENTS_TYPES[0].code
  );
  const ingredientsTypesContainer = useRef<HTMLUListElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const scrollToSection = (sectionCode: string): void => {
    const section = sectionRefs.current[sectionCode];
    const container = ingredientsTypesContainer.current;

    if (section && container) {
      const sectionTop = section.offsetTop;
      const containerTop = container.offsetTop;

      container.scrollTo({
        top: sectionTop - containerTop,
        behavior: 'smooth',
      });
    }
  };

  const setSectionRef = useCallback(
    (code: string) =>
      (el: HTMLLIElement | null): void => {
        sectionRefs.current[code] = el;
      },
    []
  );

  function debounce(func: (...arg: unknown[]) => void, delay: number) {
    let timeoutId: NodeJS.Timeout;

    return (...arg: Parameters<typeof func>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...arg), delay);
    };
  }

  function handleScroll(): void {
    const container = ingredientsTypesContainer.current;

    if (!container) return;

    const containerTop = container.offsetTop;
    const scrollTop = container.scrollTop;

    const higherVisibleSectionCode = INGREDIENTS_TYPES.find(({ code }) => {
      const section = sectionRefs.current[code];

      if (section) {
        const sectionTop = section.offsetTop - containerTop;
        const sectionBottom = section.offsetTop + section.offsetHeight - containerTop;

        return sectionBottom > scrollTop && sectionTop <= scrollTop;
      } else {
        return false;
      }
    })?.code;

    if (higherVisibleSectionCode) {
      setActiveTab(higherVisibleSectionCode);
    }
  }

  const onScroll = debounce(handleScroll, 10);

  useEffect(() => {
    const container = ingredientsTypesContainer.current;

    if (container) {
      container.addEventListener('scroll', onScroll);
      return (): void => {
        container.removeEventListener('scroll', onScroll);
      };
    }
  }, [ingredientsTypesContainer]);

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
      <ul
        ref={ingredientsTypesContainer}
        className={`${styles.types_list} custom-scroll`}
      >
        {INGREDIENTS_TYPES.map(({ name, code }) => (
          <li key={code} ref={setSectionRef(code)}>
            <h2 className="text text_type_main-medium mb-6">{name}</h2>
            <ul className={`${styles.ingredients_list} pl-4 pr-4`}>
              {ingredients
                .filter(({ type }) => type === code)
                .map((ingredient) => (
                  <li key={ingredient._id}>
                    <IngredientPreview {...ingredient} />
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
