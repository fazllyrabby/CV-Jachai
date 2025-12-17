import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import AdminRoute from "./components/AdminRoute"
import Navbar from "./components/Navbar"
import Chatbot from "./components/Chatbot"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Analysis from "./pages/Analysis"
import Careers from "./pages/Careers"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminCareers from "./pages/admin/AdminCareers"
import AdminAnalytics from "./pages/admin/AdminAnalytics"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-purple">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/analysis"
              element={
                <PrivateRoute>
                  <Analysis />
                </PrivateRoute>
              }
            />
            <Route
              path="/careers"
              element={
                <PrivateRoute>
                  <Careers />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/careers"
              element={
                <AdminRoute>
                  <AdminCareers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <AdminRoute>
                  <AdminAnalytics />
                </AdminRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
