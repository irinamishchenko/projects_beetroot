import { NavLink } from "react-router-dom";

const LINKS = [
  {
    link: "Home",
    path: "/",
  },
  {
    link: "Characters",
    path: "/characters",
  },
  {
    link: "Comics",
    path: "/comics",
  },
  {
    link: "Events",
    path: "/events",
  },
  {
    link: "Series",
    path: "/series",
  },
];

function Navigation(props) {
  const NAV_ITEMS = LINKS.map((item) => (
    <li key={item.link}>
      <NavLink to={item.path} className="navigation-item">
        {item.link}
      </NavLink>
    </li>
  ));

  return (
    <nav>
      <ul
        className={
          props.isMenuActive ? "navigation" : "navigation navigation-inactive"
        }
      >
        {NAV_ITEMS}
      </ul>
    </nav>
  );
}

export default Navigation;
