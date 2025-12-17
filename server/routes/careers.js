const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const Career = require("../models/Career")
const User = require("../models/User")

// Get Career Recommendations
router.get("/recommendations", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const careers = await Career.find()

    // Calculate match percentage for each career
    const recommendations = careers.map((career) => {
      const userSkillNames = user.currentSkills.map((s) => s.name.toLowerCase())
      const requiredSkillNames = career.requiredSkills.map((s) => s.name.toLowerCase())

      const matchedSkills = requiredSkillNames.filter((skill) => userSkillNames.includes(skill))

      const matchPercentage =
        requiredSkillNames.length > 0 ? Math.round((matchedSkills.length / requiredSkillNames.length) * 100) : 0

      // Calculate skill gaps
      const skillGaps = career.requiredSkills.filter((skill) => !userSkillNames.includes(skill.name.toLowerCase()))

      return {
        ...career.toObject(),
        matchPercentage,
        skillGaps: skillGaps.length,
        matchedSkills: matchedSkills.length,
      }
    })

    // Sort by match percentage
    recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage)

    res.json(recommendations)
  } catch (err) {
    console.error("[v0] Get careers error:", err.message)
    res.status(500).send("Server error")
  }
})

// Get Single Career
router.get("/:id", auth, async (req, res) => {
  try {
    const career = await Career.findById(req.params.id)
    if (!career) {
      return res.status(404).json({ message: "Career not found" })
    }
    res.json(career)
  } catch (err) {
    console.error("[v0] Get career error:", err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
