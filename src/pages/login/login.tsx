import { useLoginMutation } from '@/services/user/api';
import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import type { JSX } from 'react';

export function Login(): JSX.Element {
  const [login, { isLoading, isError }] = useLoginMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(loginData: { email: string; password: string }): void {
    void login(loginData);
  }

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={void handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Введите email',
          }}
          render={({ field }) => (
            <Input
              {...field}
              error={Boolean(errors.email)}
              errorText={errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Введите пароль',
          }}
          render={({ field }) => (
            <Input
              {...field}
              error={Boolean(errors.password)}
              errorText={errors.password?.message}
            />
          )}
        />
        <Button type="primary" size="medium" disabled={isLoading} htmlType="submit">
          Войти
        </Button>
        {isError && <div>Ошибка при входе. Проверьте данные и попробуйте снова.</div>}
      </form>
      <div>
        <p>
          Вы новый пользователь? <Link to="/register">Зарегистрироваться</Link>
        </p>
        <p>
          Забыли пароль? <Link to="/reset-password">Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
}
