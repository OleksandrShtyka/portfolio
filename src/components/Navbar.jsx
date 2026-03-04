// filepath: src/components/Navbar.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <span className="navbar__logo-bracket">&lt;</span>
        <span className="navbar__logo-name">Alex</span>
        <span className="navbar__logo-bracket">/&gt;</span>
      </div>

      <ul className={`navbar__links ${open ? "navbar__links--open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar__actions">
        {user ? (
          <>
            <Link to="/admin" className="btn btn--sm btn--outline">
              Dashboard
            </Link>
            <button className="btn btn--sm btn--ghost" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn--sm btn--primary">
            Admin
          </Link>
        )}
        <button
          className={`navbar__burger ${open ? "navbar__burger--open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
