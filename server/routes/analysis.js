const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const User = require("../models/User")

// Get Skills Analysis
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")

    // Calculate strengths (skills with proficiency > 70%)
    const strengths = user.currentSkills.filter((skill) => skill.proficiency >= 70)

    // Calculate growth areas (common skills user doesn't have or has low proficiency)
    const commonSkills = [
      { name: "Advanced JavaScript", target: 90, priority: "High" },
      { name: "System Design", target: 75, priority: "Medium" },
      { name: "Leadership Skills", target: 80, priority: "Medium" },
      { name: "Cloud Computing", target: 70, priority: "Low" },
    ]

    const growthAreas = commonSkills.map((skill) => {
      const userSkill = user.currentSkills.find((s) => s.name === skill.name)
      return {
        name: skill.name,
        current: userSkill ? userSkill.proficiency : 0,
        target: skill.target,
        priority: skill.priority,
      }
    })

    res.json({
      strengths,
      growthAreas,
      personalityTraits: user.personalityTraits,
      careerPreferences: user.careerPreferences,
    })
  } catch (err) {
    console.error("[v0] Get analysis error:", err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
