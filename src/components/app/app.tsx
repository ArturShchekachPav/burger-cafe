import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { Ingredient } from '@/pages/ingredient/ingredient';
import { Login } from '@/pages/login/login';
import { NotFound } from '@/pages/not-found/not-found';
import { Order } from '@/pages/order/order';
import { OrdersFeed } from '@/pages/orders-feed/orders-feed';
import { EditProfile } from '@/pages/profile/edit-profile/edit-profile';
import { ProfileLayout } from '@/pages/profile/profile-layout/profile-layout';
import { UserOrders } from '@/pages/profile/user-orders/user-orders';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import { routes } from '@/utils/constants';
import { Route, Routes, useLocation } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import { IngredientModal } from '../burger-ingredients/ingredient-modal/ingredient-modal';
import { OrderModal } from '../orders/order-modal/order-modal';
import { ProtectedRoute } from '../protected-route/protected-route';

import type { TLocation } from '@/types/types';
import type { JSX } from 'react';

import styles from './app.module.css';

export const App = (): JSX.Element => {
  const location = useLocation() as TLocation;

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        <Routes location={location.state?.background ?? location}>
          <Route index element={<Home />} />
          <Route path={routes.ORDERS_FEED} element={<OrdersFeed />} />
          <Route
            path={routes.LOGIN}
            element={<ProtectedRoute component={<Login />} onlyUnAuth />}
          />
          <Route
            path={routes.REGISTER}
            element={<ProtectedRoute component={<Register />} onlyUnAuth />}
          />
          <Route
            path={routes.FORGOT_PASSWORD}
            element={<ProtectedRoute component={<ForgotPassword />} onlyUnAuth />}
          />
          <Route
            path={routes.RESET_PASSWORD}
            element={<ProtectedRoute component={<ResetPassword />} onlyUnAuth />}
          />
          <Route
            path={routes.PROFILE}
            element={<ProtectedRoute component={<ProfileLayout />} />}
          >
            <Route index element={<EditProfile />} />
            <Route path={routes.USER_ORDERS} element={<UserOrders />} />
          </Route>
          <Route
            path={routes.USER_ORDER}
            element={<ProtectedRoute component={<Order />} />}
          />
          <Route path={routes.ORDER} element={<Order />} />
          <Route path={routes.INGREDIENT} element={<Ingredient />} />
          <Route path={routes.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </main>
      {location.state?.background && (
        <Routes>
          <Route path={routes.INGREDIENT} element={<IngredientModal />} />
          <Route
            path={routes.USER_ORDER}
            element={<ProtectedRoute component={<OrderModal />} />}
          />
          <Route path={routes.ORDER} element={<OrderModal />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
