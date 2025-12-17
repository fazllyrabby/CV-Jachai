const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Career = require("../models/Career")
const adminAuth = require("../middleware/adminAuth")

// Get dashboard statistics
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments()
    const activeUsers = await User.countDocuments({ status: "active" })
    const totalCareers = await Career.countDocuments()

    // Get users registered in last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const newUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    })

    // Get most popular careers
    const users = await User.find().select("careerInterests")
    const careerCounts = {}
    users.forEach((user) => {
      user.careerInterests.forEach((career) => {
        careerCounts[career] = (careerCounts[career] || 0) + 1
      })
    })
    const popularCareers = Object.entries(careerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    // Get skill distribution
    const skillCounts = {}
    const allUsers = await User.find().select("currentSkills")
    allUsers.forEach((user) => {
      user.currentSkills.forEach((skill) => {
        skillCounts[skill.name] = (skillCounts[skill.name] || 0) + 1
      })
    })
    const topSkills = Object.entries(skillCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }))

    res.json({
      totalUsers,
      activeUsers,
      totalCareers,
      newUsers,
      popularCareers,
      topSkills,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// Get all users with pagination
router.get("/users", adminAuth, async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const search = req.query.search || ""

    const query = search
      ? {
          $or: [{ fullName: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }],
        }
      : {}

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)

    const total = await User.countDocuments(query)

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single user details
router.get("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// Update user
router.put("/users/:id", adminAuth, async (req, res) => {
  try {
    const { fullName, email, role, status, educationLevel, experienceLevel } = req.body

    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    if (fullName) user.fullName = fullName
    if (email) user.email = email
    if (role) user.role = role
    if (status) user.status = status
    if (educationLevel) user.educationLevel = educationLevel
    if (experienceLevel) user.experienceLevel = experienceLevel

    await user.save()
    res.json({ message: "User updated successfully", user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete user
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    await User.findByIdAndDelete(req.params.id)
    res.json({ message: "User deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// Get all careers
router.get("/careers", adminAuth, async (req, res) => {
  try {
    const careers = await Career.find().sort({ title: 1 })
    res.json(careers)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new career
router.post("/careers", adminAuth, async (req, res) => {
  try {
    const career = new Career(req.body)
    await career.save()
    res.status(201).json({ message: "Career created successfully", career })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// Update career
router.put("/careers/:id", adminAuth, async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!career) {
      return res.status(404).json({ message: "Career not found" })
    }
    res.json({ message: "Career updated successfully", career })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete career
router.delete("/careers/:id", adminAuth, async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id)
    if (!career) {
      return res.status(404).json({ message: "Career not found" })
    }
    res.json({ message: "Career deleted successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
