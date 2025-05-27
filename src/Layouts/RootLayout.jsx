import { NavLink, Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div>
      <NavLink to={"/home"}>Home</NavLink> |{" "}
      <NavLink to={"/dashboard"}>Dashboard</NavLink> |{" "}
      <NavLink to={"/transaction"}>Transaction</NavLink>
      <Outlet />
    </div>
  );
}
