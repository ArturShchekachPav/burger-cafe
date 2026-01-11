import { useAppSelector } from '@/services/store';
import { useGetUserQuery } from '@/services/user/api';
import { getIsAuthChecked, getIsLoggedIn } from '@/services/user/slice';
import { routes } from '@/utils/constants';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Navigate, useLocation } from 'react-router-dom';

import type { TLocation } from '@/types/types';
import type { JSX } from 'react';

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component,
}: {
  onlyUnAuth?: boolean;
  component: JSX.Element;
}): JSX.Element => {
  useGetUserQuery();

  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const isLoggedIn = useAppSelector(getIsLoggedIn);
  const location = useLocation() as TLocation;

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isLoggedIn) {
    return <Navigate to={routes.LOGIN} state={{ from: location.pathname }} replace />;
  }

  if (onlyUnAuth && isLoggedIn) {
    const from = location?.state?.from ?? routes.HOME;

    return <Navigate to={from} replace />;
  }

  return component;
};
