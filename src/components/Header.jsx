
import NavBar from "./NavBar";

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
          <a href="/login" className="header-auth-btn">Login</a>
        )}
      </div>
    </header>
  );
}
