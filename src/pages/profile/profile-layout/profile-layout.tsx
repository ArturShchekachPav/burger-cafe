import { ErrorText } from '@/components/error-text/error-text';
import { useLogoutMutation } from '@/services/user/api';
import { routes } from '@/utils/constants';
import { NavLink, Outlet, useMatch } from 'react-router-dom';

import type { JSX } from 'react';

import styles from './profile-layout.module.css';

export const ProfileLayout = (): JSX.Element => {
  const isOrdersPage = useMatch(routes.USER_ORDERS);

  const [logout, { isError, isLoading }] = useLogoutMutation();

  return (
    <div className={styles.container}>
      <nav className={`${styles.nav}`}>
        <ul className={styles.navLinks}>
          <li className="text text_type_main-medium text_color_inactive pt-4 pb-4">
            <NavLink
              end
              className={({ isActive }) =>
                `${styles.link} ${isActive && styles.linkActive}`
              }
              to={routes.PROFILE}
            >
              Профиль
            </NavLink>
          </li>
          <li className="text text_type_main-medium text_color_inactive pt-4 pb-4">
            <NavLink
              className={({ isActive }) =>
                `${styles.link} ${isActive && styles.linkActive}`
              }
              to={routes.USER_ORDERS}
            >
              История заказов
            </NavLink>
          </li>
          <li className="text text_type_main-medium text_color_inactive pt-4 pb-4">
            <button
              onClick={() => void logout()}
              disabled={isLoading}
              className={styles.button}
              type="button"
            >
              Выход
            </button>
          </li>
        </ul>
        {isError && <ErrorText>Ошибка при выходе. Попробуйте снова</ErrorText>}
        <p
          className={`text_type_main-default text_color_inactive ${styles.description}`}
        >
          {isOrdersPage
            ? 'В этом разделе вы можете просмотреть свою историю заказов'
            : 'В этом разделе вы можете изменить свои персональные данные'}
        </p>
      </nav>
      <Outlet />
    </div>
  );
};
