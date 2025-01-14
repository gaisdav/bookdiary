import { NavLink } from 'react-router-dom';
import HomeIcon from '../../assets/icons/home.svg';
import BookIcon from '../../assets/icons/book.svg';
import PersonIcon from '../../assets/icons/person.svg';
import css from './styles.module.scss';
import { ROUTE } from '@/routes/routes.ts';

export const Navigation = () => {
  const links = [
    {
      to: ROUTE.HOME,
      icon: <HomeIcon />,
    },
    {
      to: ROUTE.LIBRARY,
      icon: <BookIcon />,
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
          <li key={to} className={css.li}>
            <NavLink
              viewTransition
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
