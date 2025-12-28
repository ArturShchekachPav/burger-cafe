import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useRef, type JSX } from 'react';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TIngredientPreviewProps } from '@/types/types';

import styles from './ingredient-preview.module.css';

export const IngredientPreview = ({
  ingredient,
}: TIngredientPreviewProps): JSX.Element => {
  const { name, price, image, count } = ingredient;
  const dragRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleIngredientDetailOpen = useCallback((): void => {
    void navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
  }, [ingredient]);

  const [{ isDrag }, drag] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  drag(dragRef);

  return (
    <div
      ref={dragRef}
      style={{ opacity: isDrag ? 0.5 : 1 }}
      onClick={handleIngredientDetailOpen}
      className={styles.ingredient_preview}
    >
      <img
        className={`${styles.image} mb-2 pr-4 pl-4`}
        src={image}
        alt={`${name}-image`}
      />
      <p className={`${styles.price} mb-2 text text_type_digits-default`}>
        {price} <CurrencyIcon type="primary" />
      </p>
      <h3 className={`${styles.name} text text_type_main-default`}>{name}</h3>
      {Boolean(count) && count !== undefined && count > 0 && (
        <Counter count={count} size="default" extraClass={styles.counter} />
      )}
    </div>
  );
};
