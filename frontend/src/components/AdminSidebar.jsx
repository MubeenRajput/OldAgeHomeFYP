"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../styles/admin-sidebar.css"

function AdminSidebar({ activeTab, setActiveTab }) {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <span className="logo-primary">Golden Years</span>
          <span className="logo-secondary">Admin</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <button
              className={`sidebar-link ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <div className="sidebar-icon home-icon"></div>
              <span>Dashboard</span>
            </button>
          </li>
          <li className="sidebar-item">
            <button
              className={`sidebar-link ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              <div className="sidebar-icon users-icon"></div>
              <span>Users</span>
            </button>
          </li>
          <li className="sidebar-item">
            <button
              className={`sidebar-link ${activeTab === "activities" ? "active" : ""}`}
              onClick={() => setActiveTab("activities")}
            >
              <div className="sidebar-icon calendar-icon"></div>
              <span>Activities</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-sidebar-btn" onClick={handleLogout}>
          <div className="sidebar-icon logout-icon"></div>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar
