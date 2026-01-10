import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { JSX } from 'react';

import styles from './order-details.module.css';

export const OrderDetails = ({ modal }: { modal?: boolean }): JSX.Element => {
  const Heading = modal ? 'h3' : 'h1';

  return (
    <div className={`${styles.container}`}>
      {!modal && (
        <p className={`text text_type_digits-default mb-6 ${styles.number}`}>#034533</p>
      )}
      <Heading className={`text text_type_main-medium mb-2`}>
        Black Hole Singularity острый бургер
      </Heading>
      <p className={`text text_type_main-default mb-15 ${styles.status}`}>Выполнен</p>
      <section className="mb-10">
        <h4 className="text text_type_main-medium mb-6">Состав:</h4>
        <ul className={`custom-scroll ${styles.ingredients}`}>
          <li className={`${styles.ingredient}`}>
            <div className={`${styles.ingredientPreviewWrapper}`}>
              <img
                className={`${styles.ingredientPreview}`}
                src="https://code.s3.yandex.net/react/code/bun-01.png"
                alt="ingredient-image"
              />
            </div>
            <h5 className="text text_type_main-default">Флюоресцентная булка R2-D3</h5>
            <p
              style={{ marginLeft: 'auto' }}
              className={`text text_type_digits-default ${styles.cost}`}
            >
              2 x 20 <CurrencyIcon type="primary" />
            </p>
          </li>
          <li className={`${styles.ingredient}`}>
            <div className={`${styles.ingredientPreviewWrapper}`}>
              <img
                className={`${styles.ingredientPreview}`}
                src="https://code.s3.yandex.net/react/code/bun-01.png"
                alt="ingredient-image"
              />
            </div>
            <h5 className="text text_type_main-default">Флюоресцентная булка R2-D3</h5>
            <p
              style={{ marginLeft: 'auto' }}
              className={`text text_type_digits-default ${styles.cost}`}
            >
              2 x 20 <CurrencyIcon type="primary" />
            </p>
          </li>
          <li className={`${styles.ingredient}`}>
            <div className={`${styles.ingredientPreviewWrapper}`}>
              <img
                className={`${styles.ingredientPreview}`}
                src="https://code.s3.yandex.net/react/code/bun-01.png"
                alt="ingredient-image"
              />
            </div>
            <h5 className="text text_type_main-default">Флюоресцентная булка R2-D3</h5>
            <p
              style={{ marginLeft: 'auto' }}
              className={`text text_type_digits-default ${styles.cost}`}
            >
              2 x 20 <CurrencyIcon type="primary" />
            </p>
          </li>
          <li className={`${styles.ingredient}`}>
            <div className={`${styles.ingredientPreviewWrapper}`}>
              <img
                className={`${styles.ingredientPreview}`}
                src="https://code.s3.yandex.net/react/code/bun-01.png"
                alt="ingredient-image"
              />
            </div>
            <h5 className="text text_type_main-default">Флюоресцентная булка R2-D3</h5>
            <p
              style={{ marginLeft: 'auto' }}
              className={`text text_type_digits-default ${styles.cost}`}
            >
              2 x 20 <CurrencyIcon type="primary" />
            </p>
          </li>
          <li className={`${styles.ingredient}`}>
            <div className={`${styles.ingredientPreviewWrapper}`}>
              <img
                className={`${styles.ingredientPreview}`}
                src="https://code.s3.yandex.net/react/code/bun-01.png"
                alt="ingredient-image"
              />
            </div>
            <h5 className="text text_type_main-default">Флюоресцентная булка R2-D3</h5>
            <p
              style={{ marginLeft: 'auto' }}
              className={`text text_type_digits-default ${styles.cost}`}
            >
              2 x 20 <CurrencyIcon type="primary" />
            </p>
          </li>
          <li className={`${styles.ingredient}`}>
            <div className={`${styles.ingredientPreviewWrapper}`}>
              <img
                className={`${styles.ingredientPreview}`}
                src="https://code.s3.yandex.net/react/code/bun-01.png"
                alt="ingredient-image"
              />
            </div>
            <h5 className="text text_type_main-default">Флюоресцентная булка R2-D3</h5>
            <p
              style={{ marginLeft: 'auto' }}
              className={`text text_type_digits-default ${styles.cost}`}
            >
              2 x 20 <CurrencyIcon type="primary" />
            </p>
          </li>
        </ul>
      </section>
      <section className={`${styles.info}`}>
        <p className="text text_type_main-default text_color_inactive">Вчера, 13:50</p>
        <p className={`text text_type_digits-default ${styles.cost}`}>
          510 <CurrencyIcon type="primary" />
        </p>
      </section>
    </div>
  );
};
