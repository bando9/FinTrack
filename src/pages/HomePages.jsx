import { NavLink } from "react-router";
export default function HomePages() {
  return (
    <div className="text-center bg-amber-200 w-1/2 h-56 rounded-xl mx-auto p-4">
      <h2 className="mt-7 mb-4 text-2xl">
        Selamat Datang di <NavLink to="/">FinTrack</NavLink>
      </h2>
      <p>Tempat landing page finance</p>
      <p>inpsirasi dari figma community</p>
    </div>
  );
}
