import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";

import Homepages from "../pages/HomePages";
import Dashboard from "../pages/Dashboard";
import Transaction from "../pages/Transaction";
import AssetTracker from "../pages/AssetTracker";
import SplitBill from "../pages/SplitBill";

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
      {
        path: "/asset",
        element: <AssetTracker />,
      },
      {
        path: "/pay",
        element: <SplitBill />,
      },
    ],
  },
]);
