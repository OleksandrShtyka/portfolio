// filepath: src/pages/Admin.jsx
import { useState } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import AdminHero from "../components/admin/AdminHero";
import AdminSkills from "../components/admin/AdminSkills";
import AdminProjects from "../components/admin/AdminProjects";
import AdminExperience from "../components/admin/AdminExperience";

const TABS = ["Hero", "Skills", "Projects", "Experience"];

export default function Admin() {
  const { user, logout } = useAuth();
  const { portfolio, refetch } = usePortfolio();
  const [activeTab, setActiveTab] = useState("Hero");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (!portfolio) return <div className="admin-loading">Loading...</div>;

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">&lt;Dashboard/&gt;</div>
        <div className="admin-sidebar__user">
          <span className="admin-sidebar__avatar">
            {user?.[0]?.toUpperCase()}
          </span>
          <span className="admin-sidebar__username">{user}</span>
        </div>
        <nav className="admin-sidebar__nav">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`admin-sidebar__link ${activeTab === tab ? "admin-sidebar__link--active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
        <button className="admin-sidebar__logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <div className="admin-main__header">
          <h1 className="admin-main__title">Edit {activeTab}</h1>
          <a href="/" target="_blank" rel="noreferrer" className="btn btn--sm btn--outline">
            View Site ↗
          </a>
        </div>

        <div className="admin-main__content">
          {activeTab === "Hero" && (
            <AdminHero data={portfolio.hero} onSave={refetch} />
          )}
          {activeTab === "Skills" && (
            <AdminSkills data={portfolio.skills} onSave={refetch} />
          )}
          {activeTab === "Projects" && (
            <AdminProjects data={portfolio.projects} onSave={refetch} />
          )}
          {activeTab === "Experience" && (
            <AdminExperience data={portfolio.experience} onSave={refetch} />
          )}
        </div>
      </main>
    </div>
  );
}
