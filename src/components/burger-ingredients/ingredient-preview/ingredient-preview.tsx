import { setSelectedIngredient } from '@/services/selected-ingredient/slice';
import { useAppDispatch } from '@/services/store';
import { CurrencyIcon, Counter } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useRef, type JSX } from 'react';
import { useDrag } from 'react-dnd';

import type { TIngredientPreviewProps } from '@utils/types';

import styles from './ingredient-preview.module.css';

export const IngredientPreview = ({
  ingredient,
}: TIngredientPreviewProps): JSX.Element => {
  const { name, price, image, count } = ingredient;
  const dispatch = useAppDispatch();
  const dragRef = useRef<HTMLDivElement>(null);

  const handleIngredientDetailOpen = useCallback((): void => {
    dispatch(setSelectedIngredient(ingredient));
  }, [dispatch, ingredient]);

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
