import { ErrorText } from '@/components/error-text/error-text';
import { UnAuthorizedPage } from '@/components/unauthorized-page/unautorized-page';
import { useRegisterMutation } from '@/services/user/api';
import { useForm } from '@/utils/useForm';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, type ChangeEvent, type JSX } from 'react';
import { Link } from 'react-router-dom';

import type { TApiError, TUserWithPassword } from '@/types/types';

export function Register(): JSX.Element {
  const [register, { isLoading, isError, error }] = useRegisterMutation();

  const { fields, setValue, setError, isValid, isAllDirty, handleSubmit } = useForm({
    name: '',
    email: '',
    password: '',
  });

  const isFormReady = isValid && isAllDirty && !isLoading;

  function onSubmit(data: TUserWithPassword): void {
    void register(data);
  }

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setValue(name as keyof TUserWithPassword, value);
    },
    [setValue]
  );

  return (
    <UnAuthorizedPage
      title="Регистрация"
      form={
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            name="name"
            value={fields.name.value}
            placeholder="Имя"
            onChange={handleInputChange}
            required
            extraClass="mb-6"
          />
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
            Зарегистрироваться
          </Button>
          {isError && (
            <ErrorText extraClass="form-error mt-3">
              {(error as TApiError).data.message === 'User already exists'
                ? 'Пользователь с таким email уже зарегистрирован'
                : 'Ошибка при регистрации. Проверьте данные и попробуйте снова.'}
            </ErrorText>
          )}
        </form>
      }
      links={[
        <>
          Уже зарегистрированы?{' '}
          <Link className="link" to="/login">
            Войти
          </Link>
        </>,
      ]}
    />
  );
}
