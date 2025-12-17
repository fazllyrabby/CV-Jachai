"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const AdminCareers = () => {
  const [careers, setCareers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCareer, setEditingCareer] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salaryRange: { min: 0, max: 0 },
    jobGrowth: "",
    requiredSkills: [],
    icon: "",
  })

  useEffect(() => {
    fetchCareers()
  }, [])

  const fetchCareers = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:5000/api/admin/careers", {
        headers: { "x-auth-token": token },
      })
      setCareers(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      if (editingCareer) {
        await axios.put(`http://localhost:5000/api/admin/careers/${editingCareer._id}`, formData, {
          headers: { "x-auth-token": token },
        })
      } else {
        await axios.post("http://localhost:5000/api/admin/careers", formData, {
          headers: { "x-auth-token": token },
        })
      }
      setShowModal(false)
      setEditingCareer(null)
      resetForm()
      fetchCareers()
    } catch (err) {
      console.error(err)
    }
  }

  const handleEdit = (career) => {
    setEditingCareer(career)
    setFormData({
      title: career.title,
      description: career.description,
      salaryRange: career.salaryRange,
      jobGrowth: career.jobGrowth,
      requiredSkills: career.requiredSkills,
      icon: career.icon || "",
    })
    setShowModal(true)
  }

  const handleDelete = async (careerId) => {
    if (window.confirm("Are you sure you want to delete this career?")) {
      try {
        const token = localStorage.getItem("token")
        await axios.delete(`http://localhost:5000/api/admin/careers/${careerId}`, {
          headers: { "x-auth-token": token },
        })
        fetchCareers()
      } catch (err) {
        console.error(err)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      salaryRange: { min: 0, max: 0 },
      jobGrowth: "",
      requiredSkills: [],
      icon: "",
    })
  }

  const addSkill = () => {
    const skillName = prompt("Enter skill name:")
    if (skillName) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, { name: skillName, required: true }],
      })
    }
  }

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter((_, i) => i !== index),
    })
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Career Management</h1>
          <p className="text-indigo-200">Manage career paths and opportunities</p>
        </div>
        <button
          onClick={() => {
            setEditingCareer(null)
            resetForm()
            setShowModal(true)
          }}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-semibold"
        >
          + Add New Career
        </button>
      </div>

      {/* Careers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((career) => (
          <div key={career._id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-indigo-100 rounded-lg p-3">
                <span className="text-2xl">{career.icon || "💼"}</span>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(career)} className="text-indigo-600 hover:text-indigo-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button onClick={() => handleDelete(career._id)} className="text-red-600 hover:text-red-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{career.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{career.description}</p>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Salary:</span> ${career.salaryRange?.min?.toLocaleString()} - $
                {career.salaryRange?.max?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Job Growth:</span>{" "}
                <span className="text-green-600">{career.jobGrowth}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {career.requiredSkills?.slice(0, 3).map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                  {skill.name}
                </span>
              ))}
              {career.requiredSkills?.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{career.requiredSkills.length - 3} more
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingCareer ? "Edit Career" : "Add New Career"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Career Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Min Salary</label>
                  <input
                    type="number"
                    value={formData.salaryRange.min}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        salaryRange: {
                          ...formData.salaryRange,
                          min: Number.parseInt(e.target.value),
                        },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Salary</label>
                  <input
                    type="number"
                    value={formData.salaryRange.max}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        salaryRange: {
                          ...formData.salaryRange,
                          max: Number.parseInt(e.target.value),
                        },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Growth (e.g., +22%)</label>
                <input
                  type="text"
                  value={formData.jobGrowth}
                  onChange={(e) => setFormData({ ...formData, jobGrowth: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon (emoji)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="💼"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                <div className="space-y-2 mb-2">
                  {formData.requiredSkills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{skill.name}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addSkill}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600"
                >
                  + Add Skill
                </button>
              </div>
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                  {editingCareer ? "Update Career" : "Create Career"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setEditingCareer(null)
                    resetForm()
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCareers
