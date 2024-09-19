import { ROUTE } from "../../routes/router.tsx";
import { NavLink } from "react-router-dom";
import HomeIcon from "../../assets/icons/home.svg";
import LibraryIcon from "../../assets/icons/library.svg";
import PersonIcon from "../../assets/icons/person.svg";
import css from "./styles.module.scss";

export const Navigation = () => {
  const links = [
    {
      to: ROUTE.HOME,
      icon: <HomeIcon />,
    },
    {
      to: ROUTE.LIBRARY,
      icon: <LibraryIcon />,
    },
    {
      to: ROUTE.PROFILE,
      icon: <PersonIcon />,
    },
  ];

  return (
    <nav className={css.nav}>
      <ul className={css.ul}>
        {links.map(({ to, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? `${css.activeLink} ${css.link}` : css.link
              }
            >
              {icon}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
