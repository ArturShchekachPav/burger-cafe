import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { JSX } from 'react';

import styles from './order-preview.module.css';

export const OrderPreview = (): JSX.Element => {
  return (
    <div className={`${styles.containter}`}>
      <header className={styles.header}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20</p>
      </header>
      <main>
        <h2 className="text text_type_main-medium mb-6">
          Death Star Starship Main бургер
        </h2>
        <div className={styles.orderData}>
          <ul className={styles.ingredientsPreviews}>
            <li style={{ zIndex: 4 }} className={`${styles.ingredientPreviewWrapper}`}>
              <img
                className={`${styles.ingredientPreview}`}
                src="https://code.s3.yandex.net/react/code/bun-01.png"
                alt="ingredient-image"
              />
            </li>
            <li style={{ zIndex: 3 }} className={`${styles.ingredientPreviewWrapper}`}>
              <img
                className={`${styles.ingredientPreview}`}
                src="https://code.s3.yandex.net/react/code/bun-01.png"
                alt="ingredient-image"
              />
            </li>
            <li style={{ zIndex: 2 }} className={`${styles.ingredientPreviewWrapper}`}>
              <img
                className={`${styles.ingredientPreview}`}
                src="https://code.s3.yandex.net/react/code/bun-01.png"
                alt="ingredient-image"
              />
            </li>
            <li style={{ zIndex: 1 }} className={`${styles.ingredientPreviewWrapper}`}>
              <img
                className={`${styles.ingredientPreview}`}
                src="https://code.s3.yandex.net/react/code/bun-01.png"
                alt="ingredient-image"
              />
            </li>
          </ul>
          <p className={`text text_type_digits-default ${styles.cost}`}>
            480 <CurrencyIcon type="primary" />
          </p>
        </div>
      </main>
    </div>
  );
};
