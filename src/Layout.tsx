import { Outlet } from "react-router-dom";
import { Navigation } from "./components/Nav";
import css from "./layout.module.scss";

export const Layout = () => {
  return (
    <div className={css.layout}>
      <main className={css.main}>
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};
