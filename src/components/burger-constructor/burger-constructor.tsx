import {
  addIngredient,
  getBurgerConstructor,
  setBun,
} from '@/services/constructor/slice';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { useRef, type JSX } from 'react';
import { useDrop } from 'react-dnd';

import { Total } from '@components/burger-constructor/total/total';

import { Bun } from './bun/bun';
import { DraggableItem } from './draggable-item/draggable-item';

import type { TIngredient } from '@/utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): JSX.Element => {
  const dropRef = useRef<HTMLDivElement>(null);
  const { ingredients, bun } = useAppSelector(getBurgerConstructor);
  const dispatch = useAppDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: 'ingredient',
    drop(ingredient: TIngredient) {
      if (ingredient.type === 'bun') {
        dispatch(setBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(dropRef);

  return (
    <section className={styles.burger_constructor}>
      <div
        style={{
          border: isOver ? '2px dashed red' : 'transparent 2px dashed',
        }}
        ref={dropRef}
        className={styles.constructor_wrapper}
      >
        {bun && <Bun bun={bun} type="top" />}
        {ingredients.length === 0 && (
          <p className={`text text_type_main-default ${styles.empty_message}`}>
            Перетащите ингредиенты для создания бургера.
            <br />
            Необходимо добавить булку и минимум один ингредиент.
          </p>
        )}
        {ingredients.length > 0 && (
          <ul className={`${styles.burger_ingredients} custom-scroll`}>
            {ingredients.map((indredient) => (
              <li key={indredient.uuid}>
                <DraggableItem ingredient={indredient} />
              </li>
            ))}
          </ul>
        )}
        {bun && <Bun bun={bun} type="bottom" />}
      </div>
      <Total />
    </section>
  );
};
