"use client"

// Importing necessary hooks and components
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import AdminSidebar from "../components/AdminSidebar"
import UsersManagement from "../components/admin/UsersManagement"
import ActivitiesTracker from "../components/admin/ActivitiesTracker"
import "../styles/admin.css"

function AdminDashboard() {
  // Accessing the authenticated user from the AuthContext
  const { user } = useAuth()

  // Hook to navigate between routes
  const navigate = useNavigate()

  // State to manage the currently active tab (e.g., dashboard, users, activities)
  const [activeTab, setActiveTab] = useState("dashboard")

  // State to store statistics for the dashboard
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalResidents: 0,
    totalCaregivers: 0,
    totalActivities: 0,
  })

  // useEffect runs when the component mounts or when `user` or `navigate` changes
  useEffect(() => {
    // Redirect to home if the user is not an admin
    if (!user || !user.isAdmin) {
      navigate("/")
    }

    // Fetch the dashboard statistics
    fetchDashboardStats()
  }, [user, navigate])

  // Function to fetch dashboard statistics (mock data for now)
  const fetchDashboardStats = async () => {
    try {
      setStats({
        totalUsers: 10,
        totalResidents: 1,
        totalCaregivers: 12,
        totalActivities: 24,
      })
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    }
  }

  // Function to render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "users":
        // Render the Users Management component
        return <UsersManagement />
      case "activities":
        // Render the Activities Tracker component
        return <ActivitiesTracker />
      default:
        // Render the dashboard overview with statistics and recent activities
        return (
          <div className="dashboard-overview">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              {/* Displaying statistics in cards */}
              <div className="stat-card">
                <div className="stat-icon users-icon"></div>
                <div className="stat-content">
                  <h3>Total Users</h3>
                  <p className="stat-number">{stats.totalUsers}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon heart-icon"></div>
                <div className="stat-content">
                  <h3>Residents</h3>
                  <p className="stat-number">{stats.totalResidents}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon shield-icon"></div>
                <div className="stat-content">
                  <h3>Caregivers</h3>
                  <p className="stat-number">{stats.totalCaregivers}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon calendar-icon"></div>
                <div className="stat-content">
                  <h3>Activities</h3>
                  <p className="stat-number">{stats.totalActivities}</p>
                </div>
              </div>
            </div>

            {/* Recent activities section */}
            <div className="recent-section">
              <h3>Recent Activities</h3>
              <div className="recent-list">
                <div className="recent-item">
                  <div className="recent-icon calendar-icon"></div>
                  <div className="recent-content">
                    <h4>Morning Yoga Session</h4>
                    <p>Scheduled for today at 9:00 AM</p>
                  </div>
                </div>
                <div className="recent-item">
                  <div className="recent-icon calendar-icon"></div>
                  <div className="recent-content">
                    <h4>Art & Craft Workshop</h4>
                    <p>Scheduled for tomorrow at 2:00 PM</p>
                  </div>
                </div>
                <div className="recent-item">
                  <div className="recent-icon calendar-icon"></div>
                  <div className="recent-content">
                    <h4>Music Therapy</h4>
                    <p>Scheduled for Wednesday at 11:00 AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent user registrations section */}
            <div className="recent-section">
              <h3>Recent User Registrations</h3>
              <div className="recent-list">
                <div className="recent-item">
                  <div className="recent-icon users-icon"></div>
                  <div className="recent-content">
                    <h4>John Smith</h4>
                    <p>Registered as Family Member</p>
                  </div>
                </div>
                <div className="recent-item">
                  <div className="recent-icon users-icon"></div>
                  <div className="recent-content">
                    <h4>Maria Garcia</h4>
                    <p>Registered as Caregiver</p>
                  </div>
                </div>
                <div className="recent-item">
                  <div className="recent-icon users-icon"></div>
                  <div className="recent-content">
                    <h4>Robert Johnson</h4>
                    <p>Registered as Healthcare Professional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar for navigation */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="admin-content">
        {/* Header section */}
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-user">
            <span>Welcome, {user?.firstName}</span>
            <div className="admin-avatar">
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}
            </div>
          </div>
        </div>
        {/* Main content area */}
        <div className="admin-main">{renderContent()}</div>
      </div>
    </div>
  )
}

export default AdminDashboard
