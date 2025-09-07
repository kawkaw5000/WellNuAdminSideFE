import "../css/report.css"; 
import Profile from '../images/Ellipse 26.svg'

export default function Header() {
  
  return (
    <div className="profile-header">
        <img
            src={Profile}
            alt="Profile"
            className="profile-avatar"
        />
        <div>
            <h2 className="profile-name">Joe Goldberg</h2>
            <p className="profile-role">Admin</p>
        </div>
    </div>
 
  );
}
