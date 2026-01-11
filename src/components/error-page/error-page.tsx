import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';

import type { JSX } from 'react';

import styles from './error-page.module.css';

export const ErrorPage = ({
  code,
  content,
  backlinkTo,
}: {
  code: string;
  content: JSX.Element | string;
  backlinkTo?: string;
}): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.container}>
      <h1 className={`text text_type_digits-large mb-8 ${styles.title}`}>{code}</h1>
      <p className={`text text_type_main-medium ${styles.content}`}>{content}</p>
      {backlinkTo && (
        <Button
          extraClass="mt-20"
          type="primary"
          size="medium"
          htmlType="button"
          onClick={() => {
            location.key !== 'default' ? void navigate(backlinkTo) : void navigate(-1);
          }}
        >
          Вернуться назад
        </Button>
      )}
    </div>
  );
};
