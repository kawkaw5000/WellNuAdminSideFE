import { NavLink } from "react-router-dom";
import "../css/sidebar.css";
import Logo from "../assets/WellNu Logo 2.svg";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="WellNu Logo" />
      </div>

      <div className="menu">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/userlogs"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          User logs
        </NavLink>

        <NavLink
          to="/userPermissions"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          User roles and permission
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          Report and analytics
        </NavLink>
      </div>

      <button className="logout-button">Log out</button>
    </div>
  );
}
