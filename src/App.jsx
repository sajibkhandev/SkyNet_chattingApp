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
import RootLayouts from './components/RootLayouts';
import Message from './pages/Message';
import Notification from './pages/Notification';
import Settiing from './pages/Settiing';

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
      path="/"
      element={<RootLayouts />}>
        <Route
        path="home"
        element={<HomePage />}>
        </Route>
        <Route
        path="message"
        element={<Message />}>
        </Route>
        <Route
        path="notification"
        element={<Notification />}>
        </Route>
        <Route
        path="setting"
        element={<Settiing />}>
        </Route>
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