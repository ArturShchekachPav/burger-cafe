import { ErrorText } from '@/components/error-text/error-text';
import { UnAuthorizedPage } from '@/components/unauthorized-page/unautorized-page';
import { useLoginMutation } from '@/services/user/api';
import { useForm } from '@/utils/useForm';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, type ChangeEvent, type JSX } from 'react';
import { Link } from 'react-router-dom';

import type { TApiError, TLoginBody } from '@/types/types';

export function Login(): JSX.Element {
  const [login, { isLoading, isError, error }] = useLoginMutation();

  const { fields, setValue, setError, isValid, isAllDirty, handleSubmit } = useForm({
    email: '',
    password: '',
  });

  const isFormReady = isValid && isAllDirty && !isLoading;

  function onSubmit(data: TLoginBody): void {
    void login(data);
  }

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setValue(name as keyof TLoginBody, value);
    },
    [setValue]
  );

  return (
    <UnAuthorizedPage
      title="Вход"
      form={
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <EmailInput
            name="email"
            value={fields.email.value}
            onChange={handleInputChange}
            checkValid={(isValid: boolean) =>
              setError('email', isValid ? undefined : 'Некорректный email')
            }
            errorText={fields.email.error}
            required
            extraClass="mb-6"
          />
          <PasswordInput
            name="password"
            value={fields.password.value}
            onChange={handleInputChange}
            checkValid={(isValid: boolean) =>
              setError('password', isValid ? undefined : 'Некорректный пароль')
            }
            errorText={fields.password.error}
            required
            extraClass="mb-6"
          />
          <Button
            extraClass="form-button"
            type="primary"
            size="medium"
            disabled={!isFormReady}
            htmlType="submit"
          >
            Войти
          </Button>
          {isError && (
            <ErrorText extraClass="form-error mt-3">
              {(error as TApiError).data.message === 'email or password are incorrect'
                ? 'Неверный email или пароль.'
                : 'Ошибка при входе. Проверьте данные и попробуйте снова.'}
            </ErrorText>
          )}
        </form>
      }
      links={[
        <>
          Вы новый пользователь?{' '}
          <Link className="link" to="/register">
            Зарегистрироваться
          </Link>
        </>,
        <>
          Забыли пароль?{' '}
          <Link className="link" to="/forgot-password">
            Восстановить пароль
          </Link>
        </>,
      ]}
    />
  );
}
