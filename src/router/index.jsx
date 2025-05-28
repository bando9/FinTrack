import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";

import Homepages from "../pages/HomePages";
import Dashboard from "../pages/Dashboard";
import Transaction from "../pages/Transaction";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepages />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
    ],
  },
]);
