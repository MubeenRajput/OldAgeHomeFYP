"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import "./styles/global.css"
import Login from "./pages/LoginPage"
import Register from "./pages/RegisterPage"
import Footer from "./components/Footer"
import AdminDashboard from "./pages/AdminDashboard"
import { useAuth } from "./context/AuthContext"

function App() {
  const { user } = useAuth()

  // Check if user is admin
  if (user && user.isAdmin) {
    return (
      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    )
  }

  return (
    <Router>
      <div className="app">
        {!user?.isAdmin && <Header />}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        {!user?.isAdmin && <Footer />}
      </div>
    </Router>
  )
}

export default App
