"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { User, LogOut } from "lucide-react"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary-700">CV Jachai</span>
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-primary-600 transition">
                  Profile
                </Link>
                <Link to="/analysis" className="text-gray-700 hover:text-primary-600 transition">
                  Analysis
                </Link>
                <Link to="/careers" className="text-gray-700 hover:text-primary-600 transition">
                  Careers
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
                  Home
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
