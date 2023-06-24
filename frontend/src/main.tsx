import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./components/auth/authProvider.tsx";
import Dashboard from "./components/routes/dashboard.tsx";
import ProtectedRoute from "./components/routes/protectRoutes.tsx";
import "./index.css";
import SiginUp from "./components/routes/siginUp.tsx";
import Login from "./components/routes/login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/siginup",
    element: <SiginUp/>,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);