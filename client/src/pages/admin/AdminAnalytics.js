"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const AdminAnalytics = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:5000/api/admin/stats", {
        headers: { "x-auth-token": token },
      })
      setStats(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Analytics & Insights</h1>
        <p className="text-indigo-200">Platform statistics and user trends</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Users</h3>
          <p className="text-4xl font-bold text-indigo-600">{stats?.totalUsers || 0}</p>
          <p className="text-sm text-green-600 mt-2">+{stats?.newUsers || 0} this month</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Active Users</h3>
          <p className="text-4xl font-bold text-green-600">{stats?.activeUsers || 0}</p>
          <p className="text-sm text-gray-500 mt-2">
            {stats?.totalUsers > 0 ? ((stats.activeUsers / stats.totalUsers) * 100).toFixed(1) : 0}% active rate
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Careers</h3>
          <p className="text-4xl font-bold text-purple-600">{stats?.totalCareers || 0}</p>
          <p className="text-sm text-gray-500 mt-2">Career paths available</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Engagement Rate</h3>
          <p className="text-4xl font-bold text-orange-600">
            {stats?.totalUsers > 0 ? ((stats.activeUsers / stats.totalUsers) * 100).toFixed(0) : 0}%
          </p>
          <p className="text-sm text-gray-500 mt-2">User engagement</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Popular Career Interests */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Career Interests</h2>
          <div className="space-y-4">
            {stats?.popularCareers?.map((career, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">{career.name}</span>
                  <span className="text-gray-500 text-sm">{career.count} users</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${(career.count / stats.totalUsers) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {((career.count / stats.totalUsers) * 100).toFixed(1)}% of users
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Skills Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Skills Distribution</h2>
          <div className="space-y-4">
            {stats?.topSkills?.map((skill, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">{skill.name}</span>
                  <span className="text-gray-500 text-sm">{skill.count} users</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-teal-600 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${(skill.count / stats.totalUsers) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {((skill.count / stats.totalUsers) * 100).toFixed(1)}% of users
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Growth Trend */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Growth</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-2">New Users (30 days)</p>
            <p className="text-4xl font-bold text-indigo-600">{stats?.newUsers || 0}</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-2">Active Users</p>
            <p className="text-4xl font-bold text-green-600">{stats?.activeUsers || 0}</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-2">Total Users</p>
            <p className="text-4xl font-bold text-orange-600">{stats?.totalUsers || 0}</p>
          </div>
        </div>
      </div>

      {/* Skills vs Careers Matrix */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Platform Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border-2 border-indigo-200 rounded-lg">
            <p className="text-3xl font-bold text-indigo-600 mb-2">{stats?.topSkills?.length || 0}</p>
            <p className="text-gray-600 text-sm">Unique Skills</p>
          </div>
          <div className="text-center p-4 border-2 border-purple-200 rounded-lg">
            <p className="text-3xl font-bold text-purple-600 mb-2">{stats?.popularCareers?.length || 0}</p>
            <p className="text-gray-600 text-sm">Career Paths</p>
          </div>
          <div className="text-center p-4 border-2 border-green-200 rounded-lg">
            <p className="text-3xl font-bold text-green-600 mb-2">{stats?.activeUsers || 0}</p>
            <p className="text-gray-600 text-sm">Active Learners</p>
          </div>
          <div className="text-center p-4 border-2 border-orange-200 rounded-lg">
            <p className="text-3xl font-bold text-orange-600 mb-2">{stats?.totalCareers || 0}</p>
            <p className="text-gray-600 text-sm">Total Careers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics
