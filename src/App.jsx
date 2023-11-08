import React from 'react'

import Registration from './pages/Registration';
import Login from './pages/Login';

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from "react-router-dom";

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
   </>
  )
);

const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App