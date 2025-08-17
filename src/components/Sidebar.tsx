import '../sidebar.css'
import Logo from '../assets/WellNu Logo 2.svg'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="WellNu Logo" />
      </div>
      <div className="menu">
        <div className="menu-item">Dashboard</div>
        <div className="menu-item">User logs</div>
        <div className="menu-item">User roles and permission</div>
        <div className="menu-item">Report and analytics</div>
      </div>
      <button className="logout-button">Log out</button>
    </div>
  );
}