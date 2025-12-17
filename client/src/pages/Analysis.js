"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { PieChart, Star, CheckCircle, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const Analysis = () => {
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalysis()
  }, [])

  const fetchAnalysis = async () => {
    try {
      const res = await axios.get("/api/analysis")
      setAnalysis(res.data)
    } catch (err) {
      console.error("[v0] Fetch analysis error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading analysis...</div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">No analysis data available</div>
      </div>
    )
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-yellow-500"
      case "Medium":
        return "text-orange-400"
      case "Low":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Profile Analysis Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-8">
            <PieChart className="w-8 h-8 text-primary-600" />
            <h2 className="text-3xl font-bold text-gray-900">Profile Analysis</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Your Strengths */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Star className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-bold text-gray-900">Your Strengths</h3>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {analysis.strengths.map((skill, index) => (
                  <div key={index} className="px-4 py-2 bg-primary-600 text-white rounded-full font-medium">
                    {skill.name}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#10b981"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(analysis.strengths.length / 10) * 352} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-600">{analysis.strengths.length}</span>
                  </div>
                </div>
              </div>

              <p className="text-center text-gray-600 mt-4 font-medium">Core Strengths Identified</p>
            </div>

            {/* Growth Areas */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Growth Areas</h3>

              <div className="space-y-6">
                {analysis.growthAreas.map((area, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{area.name}</span>
                      <span className={`font-bold ${getPriorityColor(area.priority)}`}>{area.priority}</span>
                    </div>

                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${(area.current / area.target) * 100}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>Current: {area.current}%</span>
                      <span>Target: {area.target}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Personality & Work Style Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <PieChart className="w-8 h-8 text-primary-600" />
            <h2 className="text-3xl font-bold text-gray-900">Personality & Work Style Analysis</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Personality Traits */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Personality Traits</h3>

              <div className="space-y-5">
                {Object.entries(analysis.personalityTraits).map(([trait, value]) => (
                  <div key={trait}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700 capitalize">
                        {trait.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="font-bold text-gray-900">{value}%</span>
                    </div>

                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Preferences */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Career Preferences</h3>

              <div className="space-y-4">
                {Object.entries(analysis.careerPreferences).map(([pref, enabled]) => (
                  <div key={pref} className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${enabled ? "text-green-500" : "text-gray-300"}`} />
                    <span className={`${enabled ? "text-gray-900" : "text-gray-400"}`}>
                      {pref
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .replace(/^./, (str) => str.toUpperCase())}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/careers"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              <span>View Career Recommendations</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analysis
