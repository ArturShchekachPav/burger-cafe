import { useRegisterMutation } from '@/services/user/api';
import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import type { JSX } from 'react';

export function Register(): JSX.Element {
  const [register, { isLoading, isError }] = useRegisterMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(loginData: { name: string; email: string; password: string }): void {
    void register(loginData);
  }

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={void handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Введите имя',
          }}
          render={({ field }) => (
            <Input
              {...field}
              error={Boolean(errors.name)}
              errorText={errors.name?.message}
            />
          )}
        />
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
        {isError && (
          <div>Ошибка при регистрации. Проверьте данные и попробуйте снова.</div>
        )}
      </form>
      <div>
        <p>
          Уже зарегистрированы? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
}
