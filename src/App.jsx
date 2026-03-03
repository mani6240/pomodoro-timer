
import React, { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { TimerProvider } from "./context/TimerContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import SettingsPage from "./pages/SettingsPage";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

export default function App() {
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem("loggedInUser");
		return storedUser ? JSON.parse(storedUser) : null;
	});

	const handleLogin = (userObj) => {
		setUser(userObj);
		localStorage.setItem("loggedInUser", JSON.stringify(userObj));
	};

	const handleLogout = () => {
		setUser(null);
		localStorage.removeItem("loggedInUser");
		window.location.href = `${import.meta.env.BASE_URL}#/`;
	};

	const handleRegister = () => {
		// Optionally auto-login after register
		// handleLogin(userObj);
	};

	return (
		<TimerProvider>
			<Router>
				<div className="app-layout">
					<Header user={user} onLogout={handleLogout} />
					<div className="app-shell">
						<div className="dashboard-content">
							<Routes>
								<Route path="/login" element={<Login onLogin={handleLogin} />} />
								<Route path="/register" element={<Register onRegister={handleRegister} />} />
								<Route path="/dashboard" element={<Home />} />
								<Route path="/statistics" element={<Statistics />} />
								<Route path="/settings" element={<SettingsPage />} />
								<Route path="/about" element={<About />} />
								<Route path="/" element={<Home />} />
								{/* Fallback route for unmatched paths */}
								<Route path="*" element={<Home />} />
							</Routes>
						</div>
					</div>
					<footer className="dashboard-footer">
						<span>© 2026 Dev Pomodoro. Built for focused work.</span>
					</footer>
				</div>
			</Router>
		</TimerProvider>
	);
}

