import React from 'react'
import ReactDOM from 'react-dom/client'
import "./App.css";
import { Login, Register, ErrorPage, Chat } from '../utils/import.js';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import { getToken } from '../utils/localStorage.js';

// prevent access if token is not set
const AuthorizedRoute = ({ element }) => {
  const token = getToken();
  return token ? element : <Navigate to="/login" state={{ message: 'Please login first to access the page' }} replace/>;
};
// prevent access if token is set
const ProtectedRoute = ({ element }) => {
  const token = getToken();
  return token ?  <Navigate to="/" replace/> : element;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthorizedRoute element={<App />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <ProtectedRoute element={<Login />} />,
    errorElement: <ErrorPage />
  },
  {
    path: '/register',
    element: <ProtectedRoute element={<Register />} />,
    errorElement: <ErrorPage />
  },
  {
    path: '/chat',
    element: <Chat />,
    errorElement: <ErrorPage />
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
      <RouterProvider router={router} />
      <ToastContainer />
  </>,
)
