import { ForgotPassword } from '@/pages/forgot-password/forgot-password';
import { Home } from '@/pages/home/home';
import { Ingredient } from '@/pages/ingredient/ingredient';
import { Login } from '@/pages/login/login';
import { Profile } from '@/pages/profile/profile';
import { Register } from '@/pages/register/register';
import { ResetPassword } from '@/pages/reset-password/reset-password';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  type Location,
} from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import { IndredientDetails } from '../burger-ingredients/indredient-details/indredient-details';
import { Modal } from '../modal/modal';

import type { JSX } from 'react';

import styles from './app.module.css';

export const App = (): JSX.Element => {
  const location = useLocation() as Location<{ background?: Location }>;
  const navigate = useNavigate();

  function handleIngredientDetailClose(): void {
    void navigate(location.state?.background?.pathname ?? '/');
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <Routes location={location.state?.background ?? location}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ingredients/:id" element={<Ingredient />} />
        </Routes>
      </main>
      {location.state?.background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal title="Детали ингредиента" onClose={handleIngredientDetailClose}>
                <IndredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
