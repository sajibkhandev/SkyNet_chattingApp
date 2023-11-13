import React from 'react'

import Registration from './pages/Registration';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";
import HomePage from './pages/HomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
   <>
    <Route
      path="/"
      element={<Registration />}>
    </Route>
    <Route
      path="/login"
      element={<Login />}>
    </Route>
    <Route
      path="/home"
      element={<HomePage />}>
    </Route>
   </>
  )
);

const App = () => {
  return (
    <>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <RouterProvider router={router} />
    </>
  )
}

export default App