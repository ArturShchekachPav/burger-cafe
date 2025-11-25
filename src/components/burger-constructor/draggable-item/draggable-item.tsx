import { moveIngredient, removeIngredient } from '@/services/constructor/slice';
import { useAppDispatch } from '@/services/store';
import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useRef, type JSX } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { TBurgerConstructorIngredient } from '@/utils/types';
import type { Identifier, XYCoord } from 'dnd-core';

import styles from './draggable-item.module.css';

type DragItem = {
  index: number;
  id: string;
};

export function DraggableItem({
  ingredient: { _id, uuid, price, name, image },
  index,
}: {
  ingredient: TBurgerConstructorIngredient;
  index: number;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const dragButtonRef = useRef<HTMLButtonElement>(null);

  const onIngredientRemove = useCallback(
    (ids: Pick<TBurgerConstructorIngredient, '_id' | 'uuid'>): void => {
      dispatch(removeIngredient(ids));
    },
    [dispatch]
  );

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'constructor-ingredient',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveIngredient({ from: dragIndex, to: hoverIndex }));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'constructor-ingredient',
    item: () => {
      return { uuid, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(dragButtonRef);
  drop(ref);
  dragPreview(ref);

  return (
    <div
      style={{ opacity: isDragging ? 0 : 1 }}
      ref={ref}
      className={styles.burger_ingredient}
      data-handler-id={handlerId}
    >
      <button ref={dragButtonRef} className={styles.drag_button}>
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
}
