import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./router/index";
import { NotificationsProvider } from "@toolpad/core/useNotifications";

function App() {
  return (
    <>
      <NotificationsProvider>
        <RouterProvider router={router} />
      </NotificationsProvider>
      ;
    </>
  );
}

export default App;
