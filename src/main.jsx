import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Router/Main';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AboutUs from './Pages/AboutUs';
import AuthProvider from './Provider/AuthProvider';
import PrivateRoute from './Route/PrivateRoute';
import Orders from './Pages/Orders';
import Profile from './Pages/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'about-us',
        element: <AboutUs />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/orders',
        element: <PrivateRoute><Orders/></PrivateRoute>
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile/></PrivateRoute>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
