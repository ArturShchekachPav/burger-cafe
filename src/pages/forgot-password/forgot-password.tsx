import { ErrorText } from '@/components/error-text/error-text';
import { UnAuthorizedPage } from '@/components/unauthorized-page/unautorized-page';
import { useForgotPasswordMutation } from '@/services/password/api';
import { routes } from '@/utils/constants';
import { useForm } from '@/utils/useForm';
import { setResetPasswordToken } from '@/utils/utils';
import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, type ChangeEvent, type JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import type { TForgotPasswordBody } from '@/types/types';

export function ForgotPassword(): JSX.Element {
  const [forgotPassword, { isLoading, isError, isSuccess }] =
    useForgotPasswordMutation();

  const { fields, setValue, setError, isValid, isAllDirty, handleSubmit } = useForm({
    email: '',
  });

  const navigate = useNavigate();

  const isFormReady = isValid && isAllDirty && !isLoading;

  function onSubmit(data: TForgotPasswordBody): void {
    void forgotPassword(data);
  }

  useEffect(() => {
    if (isSuccess) {
      setResetPasswordToken();
      void navigate(routes.RESET_PASSWORD);
    }
  }, [isSuccess]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setValue(name as keyof TForgotPasswordBody, value);
    },
    [setValue]
  );

  return (
    <UnAuthorizedPage
      title="Восстановление пароля"
      form={
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <EmailInput
            name="email"
            value={fields.email.value}
            onChange={handleInputChange}
            placeholder="Укажите e-mail"
            checkValid={(isValid: boolean) =>
              setError('email', isValid ? undefined : 'Некорректный email')
            }
            errorText={fields.email.error}
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
            Восстановить
          </Button>
          {isError && (
            <ErrorText extraClass="form-error mt-3">
              Ошибка при восстановлении пароля. Проверьте данные и попробуйте снова.
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
