
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

export default function Header({ user, onLogout }) {
  return (
    <header className="dashboard-header fixed-header">
      <h1>Dev Pomodoro</h1>
      <p>Premium productivity timer for developers</p>
      <NavBar />
      <div className="header-auth">
        {user ? (
          <div className="header-user">
            <span className="header-user-email">Welcome, {user.email}</span>
            <button type="button" className="header-auth-btn" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className="header-auth-btn">Login</Link>
        )}
      </div>
    </header>
  );
}
