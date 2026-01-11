import { ErrorText } from '@/components/error-text/error-text';
import { UnAuthorizedPage } from '@/components/unauthorized-page/unautorized-page';
import { useUpdatePasswordMutation } from '@/services/password/api';
import { routes } from '@/utils/constants';
import { useForm } from '@/utils/useForm';
import { clearResetPasswordToken, getResetPasswordToken } from '@/utils/utils';
import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, type ChangeEvent, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { TUpdatePasswordBody } from '@/types/types';

export function ResetPassword(): JSX.Element {
  const [updatePassword, { isLoading, isError, isSuccess }] =
    useUpdatePasswordMutation();

  const { fields, setValue, setError, isValid, isAllDirty, handleSubmit } = useForm({
    password: '',
    token: '',
  });

  const navigate = useNavigate();

  const isFormReady = isValid && isAllDirty && !isLoading;

  function onSubmit(data: TUpdatePasswordBody): void {
    void updatePassword(data);
  }

  useEffect(() => {
    if (isSuccess) {
      clearResetPasswordToken();
      void navigate(routes.LOGIN, { replace: true });
    }
  }, [isSuccess]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setValue(name as keyof TUpdatePasswordBody, value);
    },
    [setValue]
  );

  useEffect(() => {
    const resetPasswordToken = getResetPasswordToken();

    if (resetPasswordToken === null) {
      void navigate(routes.FORGOT_PASSWORD, { replace: true });
    }
  }, []);

  return (
    <UnAuthorizedPage
      title="Восстановление пароля"
      form={
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <PasswordInput
            name="password"
            value={fields.password.value}
            placeholder="Введите новый пароль"
            onChange={handleInputChange}
            checkValid={(isValid: boolean) =>
              setError('password', isValid ? undefined : 'Некорректный пароль')
            }
            errorText={fields.password.error}
            required
            extraClass="mb-6"
          />
          <Input
            name="token"
            value={fields.token.value}
            placeholder="Введите код из письма"
            onChange={handleInputChange}
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
            Сохранить
          </Button>
          {isError && (
            <ErrorText extraClass="form-error mt-3">
              Ошибка при обнолении пароля. Проверьте данные и попробуйте снова.
            </ErrorText>
          )}
        </form>
      }
      links={[
        <>
          Вспомнили пароль?{' '}
          <Link className="link" to="/login">
            Войти
          </Link>
        </>,
      ]}
    />
  );
}
