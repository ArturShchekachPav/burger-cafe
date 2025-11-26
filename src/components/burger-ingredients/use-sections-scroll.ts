import { getIngredients } from '@/services/ingredients/slice';
import { useAppSelector } from '@/services/store';
import { INGREDIENTS_TYPES } from '@/utils/constants';
import { debounce } from '@/utils/utils';
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

export function useSectionsScroll(): {
  activeTab: (typeof INGREDIENTS_TYPES)[number]['code'];
  containerRef: RefObject<HTMLUListElement | null>;
  setSectionRef: (code: string) => (el: HTMLLIElement | null) => void;
  scrollToSection: (sectionCode: string) => void;
} {
  const [activeTab, setActiveTab] = useState<(typeof INGREDIENTS_TYPES)[number]['code']>(
    INGREDIENTS_TYPES[0].code
  );
  const ingredients = useAppSelector(getIngredients);
  const containerRef = useRef<HTMLUListElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const scrollToSection = useCallback(
    (sectionCode: string): void => {
      const section = sectionRefs.current[sectionCode];
      const container = containerRef.current;

      if (section && container) {
        const sectionTop = section.offsetTop;
        const containerTop = container.offsetTop;

        container.scrollTo({
          top: sectionTop - containerTop,
          behavior: 'smooth',
        });
      }
    },
    [sectionRefs, containerRef]
  );

  const setSectionRef = useCallback(
    (code: string) =>
      (el: HTMLLIElement | null): void => {
        sectionRefs.current[code] = el;
      },
    []
  );

  const getActiveTab = useCallback((): void => {
    const container = containerRef.current;

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
  }, [containerRef, sectionRefs, setActiveTab, ingredients]);

  useEffect(() => {
    const container = containerRef.current;
    const onScroll = debounce(getActiveTab, 50);

    if (container) {
      container.addEventListener('scroll', onScroll);
      return (): void => {
        container.removeEventListener('scroll', onScroll);
      };
    }
  }, [containerRef, getActiveTab]);

  return {
    activeTab,
    containerRef,
    setSectionRef,
    scrollToSection,
  };
}
