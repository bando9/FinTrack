import { NavLink, Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div>
      <NavLink to={"/"}>Home</NavLink> |{" "}
      <NavLink to={"/dashboard"}>Dashboard</NavLink> |{" "}
      <NavLink to={"/transaction"}>Transaction</NavLink> |{" "}
      <NavLink to={"/asset"}>Asset Tracker</NavLink>
      <Outlet />
    </div>
  );
}
