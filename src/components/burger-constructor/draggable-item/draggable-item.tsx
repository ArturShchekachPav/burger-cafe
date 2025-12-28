import { moveIngredient, removeIngredient } from '@/services/constructor/slice';
import { useAppDispatch } from '@/services/store';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useRef, type JSX } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { TBurgerConstructorIngredient } from '@/types/types';

import styles from './draggable-item.module.css';

export const DraggableItem = function DraggableItem({
  ingredient: { _id, uuid, price, name, image },
}: {
  ingredient: TBurgerConstructorIngredient;
}): JSX.Element {
  const dispatch = useAppDispatch();

  const onIngredientRemove = useCallback(
    (ids: Pick<TBurgerConstructorIngredient, '_id' | 'uuid'>): void => {
      dispatch(removeIngredient(ids));
    },
    [dispatch]
  );

  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'burgerIngredient',
    item: () => ({ uuid }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'burgerIngredient',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: { uuid: string }) => {
      if (item.uuid !== uuid) {
        dispatch(moveIngredient({ from: item.uuid, to: uuid }));
      }
    },
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      style={{ opacity }}
      ref={ref}
      className={styles.burger_ingredient}
      data-handler-id={handlerId}
    >
      <button className={styles.drag_button}>
        <DragIcon type="primary" />
      </button>
      <ConstructorElement
        handleClose={() => onIngredientRemove({ _id, uuid })}
        price={price}
        text={name}
        thumbnail={image}
      />
    </div>
  );
};
