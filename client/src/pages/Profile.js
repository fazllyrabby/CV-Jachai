"use client"

import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import { User, Plus, X, Save, CheckCircle } from "lucide-react"

const Profile = () => {
  const { user, loadUser } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    fullName: "",
    educationLevel: "",
    experienceLevel: "",
    currentSkills: [],
    careerInterests: [],
  })
  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        educationLevel: user.educationLevel || "",
        experienceLevel: user.experienceLevel || "",
        currentSkills: user.currentSkills || [],
        careerInterests: user.careerInterests || [],
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData({
        ...formData,
        currentSkills: [...formData.currentSkills, { name: newSkill.trim(), proficiency: 50 }],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      currentSkills: formData.currentSkills.filter((_, i) => i !== index),
    })
  }

  const addInterest = () => {
    if (newInterest.trim() && !formData.careerInterests.includes(newInterest.trim())) {
      setFormData({
        ...formData,
        careerInterests: [...formData.careerInterests, newInterest.trim()],
      })
      setNewInterest("")
    }
  }

  const removeInterest = (index) => {
    setFormData({
      ...formData,
      careerInterests: formData.careerInterests.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      await axios.put("/api/profile", formData)
      await loadUser()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error("[v0] Profile update error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Your Profile</h2>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-green-800">Profile updated successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-2">
                Education Level
              </label>
              <select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select Education</option>
                <option value="High School">High School</option>
                <option value="Associate">Associate Degree</option>
                <option value="Bachelor">Bachelor's Degree</option>
                <option value="Master">Master's Degree</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select Experience</option>
                <option value="Entry Level">Entry Level (0-2 years)</option>
                <option value="Junior">Junior (2-4 years)</option>
                <option value="Mid-Level">Mid-Level (4-7 years)</option>
                <option value="Senior">Senior (7-10 years)</option>
                <option value="Lead">Lead (10+ years)</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Skills</label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  placeholder="Add a skill"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.currentSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 py-2 rounded-full"
                  >
                    <span className="text-sm font-medium">{skill.name}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="hover:bg-primary-200 rounded-full p-1 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Career Interests</label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                  placeholder="Add a career interest"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                />
                <button
                  type="button"
                  onClick={addInterest}
                  className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.careerInterests.map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-2 rounded-full"
                  >
                    <span className="text-sm font-medium">{interest}</span>
                    <button
                      type="button"
                      onClick={() => removeInterest(index)}
                      className="hover:bg-green-200 rounded-full p-1 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? "Saving..." : "Save Profile"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
