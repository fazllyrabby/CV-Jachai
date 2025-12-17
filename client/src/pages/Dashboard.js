"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Trophy, Star, Flame, Award, TrendingUp, User, GraduationCap, Target } from "lucide-react"

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/api/dashboard")
      setDashboardData(res.data)
    } catch (err) {
      console.error("[v0] Fetch dashboard error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">No dashboard data available</div>
      </div>
    )
  }

  const { gamification, achievements, skillProgress, recommendedSteps } = dashboardData

  const achievementIcons = [
    { icon: Star, color: "bg-yellow-500" },
    { icon: GraduationCap, color: "bg-orange-500" },
    { icon: Target, color: "bg-green-500" },
    { icon: Flame, color: "bg-orange-500" },
    { icon: Award, color: "bg-yellow-500" },
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">{gamification.skillsMastered}</div>
            <div className="text-gray-600 font-medium">Skills Mastered</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">{gamification.xpPoints}</div>
            <div className="text-gray-600 font-medium">XP Points</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">{gamification.badgesEarned.length}</div>
            <div className="text-gray-600 font-medium">Badges Earned</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">{gamification.dayStreak}</div>
            <div className="text-gray-600 font-medium">Day Streak</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Achievements Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Trophy className="w-8 h-8 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
            </div>

            {/* Achievement Badges */}
            <div className="flex space-x-3 mb-8">
              {achievementIcons.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div key={index} className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                )
              })}
            </div>

            {/* Recent Milestones */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Milestones</h3>

              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary-200" />

                <div className="space-y-6">
                  {achievements.slice(0, 3).map((achievement, index) => (
                    <div key={achievement._id} className="relative flex items-start space-x-4">
                      <div className="relative z-10 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 pt-2">
                        <div className="flex items-center space-x-2 mb-1">
                          <User className="w-4 h-4 text-gray-600" />
                          <span className="font-semibold text-gray-900">{achievement.title}</span>
                        </div>
                        <p className="text-sm text-gray-600">{new Date(achievement.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Skill Progress Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="w-8 h-8 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Skill Progress</h2>
            </div>

            <div className="space-y-6 mb-8">
              {skillProgress.slice(0, 5).map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{skill.name}</span>
                    <span className="text-sm font-bold text-gray-600">{skill.progress}%</span>
                  </div>

                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Next Steps */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended Next Steps</h3>

              <div className="space-y-3">
                {recommendedSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700 flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
