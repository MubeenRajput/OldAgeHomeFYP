"use client"

import { useState, useEffect } from "react"
import "../../styles/users-management.css"

function UsersManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "family",
    isAdmin: false,
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      // In a real app, you would fetch this from your API
      // For now, we'll use mock data
        const response = await fetch("http://localhost:5000/api/activity/");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);

      // const mockUsers = [
      //   {
      //     _id: "1",
      //     firstName: "Josakdjgl ahsdhn",
      //     lastName: "Doe",
      //     email: "john@example.com",
      //     phone: "555-123-4567",
      //     role: "family",
      //     isAdmin: false,
      //     createdAt: "2023-01-15T10:30:00Z",
      //   },
      //   {
      //     _id: "2",
      //     firstName: "Jane",
      //     lastName: "Smith",
      //     email: "jane@example.com",
      //     phone: "555-987-6543",
      //     role: "caregiver",
      //     isAdmin: false,
      //     createdAt: "2023-02-20T14:45:00Z",
      //   },
      //   {
      //     _id: "3",
      //     firstName: "Robert",
      //     lastName: "Johnson",
      //     email: "robert@example.com",
      //     phone: "555-456-7890",
      //     role: "healthcare",
      //     isAdmin: false,
      //     createdAt: "2023-03-10T09:15:00Z",
      //   },
      //   {
      //     _id: "4",
      //     firstName: "Emily",
      //     lastName: "Davis",
      //     email: "emily@example.com",
      //     phone: "555-789-0123",
      //     role: "resident",
      //     isAdmin: false,
      //     createdAt: "2023-04-05T16:20:00Z",
      //   },
      //   {
      //     _id: "5",
      //     firstName: "Admin",
      //     lastName: "User",
      //     email: "admin@example.com",
      //     phone: "555-321-6547",
      //     role: "other",
      //     isAdmin: true,
      //     createdAt: "2023-01-01T08:00:00Z",
      //   },
      // ]

      setUsers(response.data)
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch users")
      setLoading(false)
    }
  }

  const handleAddUser = async (e) => {
    e.preventDefault()

    if (newUser.password !== newUser.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      // In a real app, you would send this to your API
      console.log("Adding new user:", newUser)

      // Mock adding a user
      const mockNewUser = {
        _id: Date.now().toString(),
        ...newUser,
        createdAt: new Date().toISOString(),
      }

      setUsers([...users, mockNewUser])
      setShowAddModal(false)
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "family",
        isAdmin: false,
      })
    } catch (err) {
      setError("Failed to add user")
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // In a real app, you would send this to your API
        console.log("Deleting user:", userId)

        // Mock deleting a user
        setUsers(users.filter((user) => user._id !== userId))
      } catch (err) {
        setError("Failed to delete user")
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewUser({
      ...newUser,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = filterRole === "all" || user.role === filterRole

    return matchesSearch && matchesRole
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "family":
        return "badge-blue"
      case "resident":
        return "badge-green"
      case "caregiver":
        return "badge-purple"
      case "healthcare":
        return "badge-orange"
      default:
        return "badge-gray"
    }
  }

  return (
    <div className="users-management">
      <div className="users-header">
        <h2>Users Management</h2>
        <button className="btn primary-btn" onClick={() => setShowAddModal(true)}>
          Add New User
        </button>
      </div>

      <div className="users-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-box">
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="filter-select">
            <option value="all">All Roles</option>
            <option value="family">Family</option>
            <option value="resident">Resident</option>
            <option value="caregiver">Caregiver</option>
            <option value="healthcare">Healthcare</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-results">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span className={`role-badge ${getRoleBadgeClass(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="action-btn edit-btn" title="Edit User">
                          <span className="action-icon edit-icon"></span>
                        </button>
                        <button
                          className="action-btn delete-btn"
                          title="Delete User"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <span className="action-icon delete-icon"></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New User</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleAddUser}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={newUser.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={newUser.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={newUser.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={newUser.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select id="role" name="role" value={newUser.role} onChange={handleInputChange} required>
                    <option value="family">Family Member</option>
                    <option value="resident">Resident</option>
                    <option value="caregiver">Caregiver</option>
                    <option value="healthcare">Healthcare Professional</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group checkbox-group">
                  <label htmlFor="isAdmin" className="checkbox-label">
                    <input
                      type="checkbox"
                      id="isAdmin"
                      name="isAdmin"
                      checked={newUser.isAdmin}
                      onChange={handleInputChange}
                    />
                    <span>Admin User</span>
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn secondary-btn" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn primary-btn">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersManagement
