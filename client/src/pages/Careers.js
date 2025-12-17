"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Briefcase, CheckCircle, Plus, TrendingUp, DollarSign, GraduationCap } from "lucide-react"

const Careers = () => {
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCareers()
  }, [])

  const fetchCareers = async () => {
    try {
      const res = await axios.get("/api/careers/recommendations")
      setCareers(res.data)
    } catch (err) {
      console.error("[v0] Fetch careers error:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading career recommendations...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Career Recommendations</h1>
          <p className="text-xl text-white/80">Discover careers that match your skills and interests</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map((career) => (
            <div key={career._id} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition">
              {/* Career Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                  {career.matchPercentage}% Match
                </div>
              </div>

              {/* Career Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{career.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{career.description}</p>

              {/* Salary Range */}
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">
                  Salary Range:{" "}
                  <span className="text-gray-900">
                    ${career.salaryRange.min.toLocaleString()} - ${career.salaryRange.max.toLocaleString()}
                  </span>
                </span>
              </div>

              {/* Job Growth */}
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700">
                  Job Growth: <span className="text-green-600">{career.jobGrowth}</span>
                </span>
              </div>

              {/* Required Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Required Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {career.requiredSkills.slice(0, 6).map((skill, index) => {
                    const hasSkill = career.matchedSkills > index
                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                          hasSkill ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {hasSkill ? <CheckCircle className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        <span>{skill.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Skill Gap Analysis */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Skill Gap Analysis:</span>
                  <span className="text-sm text-gray-600">{career.skillGaps} skills to develop</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${career.matchPercentage}%` }}
                  />
                </div>
              </div>

              {/* View Learning Path Button */}
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition">
                <GraduationCap className="w-5 h-5" />
                <span>View Learning Path</span>
              </button>
            </div>
          ))}
        </div>

        {careers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white text-lg">
              No career recommendations available. Please complete your profile first.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Careers
