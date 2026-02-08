import { ErrorPage } from '@/components/error-page/error-page';
import { ErrorText } from '@/components/error-text/error-text';
import { useGetUserQuery, useUpdateUserMutation } from '@/services/user/api';
import { routes } from '@/utils/constants';
import { useForm } from '@/utils/useForm';
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useEffect, type ChangeEvent, type JSX } from 'react';

import type { TApiError, TUserWithPassword } from '@/types/types';

import styles from './edit-profile.module.css';

export function EditProfile(): JSX.Element {
  const { data, isLoading: userLoading, isError: userError } = useGetUserQuery();
  const [updateUser, { isLoading: isUpdating, isError: isUpdateError, error }] =
    useUpdateUserMutation();

  const user = data?.user;

  const { fields, setValue, setError, isValid, isDirty, handleSubmit, reset } = useForm({
    email: user?.email ?? '',
    name: user?.name ?? '',
    password: '',
  });

  useEffect(() => {
    if (data) {
      reset();
    }
  }, [data]);

  const isFormReady = isValid && isDirty && !isUpdating;

  function onSubmit(updateUserData: TUserWithPassword): void {
    void updateUser(updateUserData);
  }

  function handleReset(): void {
    reset();
  }

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setValue(name as keyof TUserWithPassword, value);
    },
    [setValue]
  );

  useEffect(() => {
    if (!fields.email.value) setError('email', 'Введите email');
  }, [fields.email.value]);

  if (userError) {
    return (
      <ErrorPage
        code="500"
        content="Ошибка при загрузке данных пользователя. Пожалуйста, попробуйте позже"
        backlinkTo={routes.HOME}
      />
    );
  }

  if (userLoading) {
    return (
      <div style={{ margin: 'auto' }} className="pt-25 pb-25">
        <Preloader />
      </div>
    );
  }

  return (
    <form
      className={`${styles.container}`}
      onSubmit={handleSubmit(onSubmit)}
      onReset={handleReset}
    >
      <Input
        name="name"
        value={fields.name.value}
        placeholder="Имя"
        icon="EditIcon"
        onChange={handleInputChange}
        required
        extraClass="mb-6"
        onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
          const value = e.target.value;

          setError('name', value ? undefined : 'Введите имя');
        }}
        errorText={fields.name.error}
        error={Boolean(fields.name.error)}
      />
      <EmailInput
        isIcon
        name="email"
        placeholder="Логин"
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
        icon="EditIcon"
        onChange={handleInputChange}
        checkValid={(isValid: boolean) =>
          setError('password', isValid ? undefined : 'Некорректный пароль')
        }
        errorText={fields.password.error}
        extraClass="mb-6"
      />
      {isDirty && (
        <div className={styles.buttons}>
          <Button type="secondary" size="medium" disabled={isUpdating} htmlType="reset">
            Отмена
          </Button>
          <Button type="primary" size="medium" disabled={!isFormReady} htmlType="submit">
            Сохранить
          </Button>
        </div>
      )}
      {isUpdateError && (
        <ErrorText extraClass="mt-8">
          {(error as TApiError).data.message === 'User with such email already exists'
            ? 'Пользователь с таким email уже зарегистрирован.'
            : 'Ошибка при обновлении данных. Проверьте данные и попробуйте снова.'}
        </ErrorText>
      )}
    </form>
  );
}
