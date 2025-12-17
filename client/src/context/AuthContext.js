"use client"

import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem("token"))

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token
      loadUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const loadUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me")
      setUser(res.data)
    } catch (err) {
      console.error("Load user error:", err)
      localStorage.removeItem("token")
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      setToken(res.data.token)
      axios.defaults.headers.common["x-auth-token"] = res.data.token
      setUser(res.data.user)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" }
    }
  }

  const register = async (fullName, email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", { fullName, email, password })
      localStorage.setItem("token", res.data.token)
      setToken(res.data.token)
      axios.defaults.headers.common["x-auth-token"] = res.data.token
      setUser(res.data.user)
      return { success: true }
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Registration failed" }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common["x-auth-token"]
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loadUser }}>{children}</AuthContext.Provider>
  )
}
