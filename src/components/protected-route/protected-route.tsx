// import { useSelector } from 'react-redux';
// import { Navigate, useLocation, type Location } from 'react-router-dom';

// import { selectIsAuthChecked, selectUser } from '../services/user';

// import type { JSX } from 'react';

// export const Protected = ({
//   onlyUnAuth = false,
//   component,
// }: {
//   onlyUnAuth?: boolean;
//   component: JSX.Element;
// }): JSX.Element => {
//   const user = useSelector(selectUser);
//   const isAuthChecked = useSelector(selectIsAuthChecked);
//   const location = useLocation() as Location<{ from?: Location['pathname'] }>;

//   if (!isAuthChecked) {
//     return <div>Loading...</div>;
//   }

//   if (!onlyUnAuth && !user) {
//     return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//   }

//   if (onlyUnAuth && user) {
//     const from = location?.state?.from ?? '/';

//     return <Navigate to={from} replace />;
//   }

//   return component;
// };
