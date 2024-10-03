import { Route, Routes } from 'react-router-dom';
import './App.css';
import { UserProvider } from './Context/UserContext';
import LayoutAdmin from './Layout/Admin/LayoutAdmin';
import ProtectedRoute from './ProtectedRoute';
import ResetPassword from './Login/ResetPassword/ResetPassword';
import ForgotPassword from './Login/ForgotPassword/ForgotPassword';
import Register from './Login/Register/register';
import Login from './Login';
import LayoutUser from './Layout/User/LayoutUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from './Login/ChangePassword/ChangePassword';
import UserPageProductDetail from './Layout/User/ProductDetail/UserPageProductDetail';
import Profile from './Layout/Profile/Profile';
import AllProductPage from './Layout/User/Content/AllProductPage/AllProductPage';
import Cart from './Layout/User/Cart/Cart';

interface RouteComponent {
  path: string;
  element: React.ReactElement;
  children?: RouteComponent[];
}

function App() {

  const routes: RouteComponent[] = [
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/reset-password',
      element: <ResetPassword />
    },
    {
      path: '/change-password',
      element: <ChangePassword />
    },
    {
      path: '/admin/*',
      element: <ProtectedRoute element={<LayoutAdmin />} requiredRole="ADMIN" />,
    },
    {
      path: '/user',
      element: <ProtectedRoute element={<LayoutUser />} requiredRole="USER" />,
    },
    {
      path: '/user/product-detail/:id',
      element: <UserPageProductDetail />,
    },
    {
      path: '/user/cart',
      element: <Cart />,
    },
    {
      path: '/user/all-product',
      element: <AllProductPage />,
    },
    {
      path: '/account/profile',
      element: <Profile />,
    },
  ];

  const renderRoutes = (children: RouteComponent[] = [], path = '') => {
    return children.map((route) => {
      const currentPath = path + route.path;
      return (
        <Route
          key={currentPath}
          path={currentPath}
          element={route.element}
        >
          {route?.children && renderRoutes(route.children, currentPath)}
        </Route>
      );
    });
  };

  return (
    <>
      <UserProvider>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </UserProvider>
      <div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
