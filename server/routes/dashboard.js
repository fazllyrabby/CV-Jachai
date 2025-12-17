const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const User = require("../models/User")
const Achievement = require("../models/Achievement")

// Get Dashboard Data
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    const achievements = await Achievement.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(10)

    // Calculate skill progress
    const skillProgress = user.currentSkills.map((skill) => ({
      name: skill.name,
      progress: skill.proficiency,
    }))

    // Get recommended next steps based on skill gaps
    const recommendedSteps = [
      "Complete JavaScript Advanced Course",
      "Practice System Design Problems",
      "Build a Full-Stack Project",
    ]

    res.json({
      gamification: user.gamification,
      achievements,
      skillProgress,
      recommendedSteps,
    })
  } catch (err) {
    console.error("[v0] Get dashboard error:", err.message)
    res.status(500).send("Server error")
  }
})

// Update Skill Progress
router.post("/skill-progress", auth, async (req, res) => {
  const { skillName, progress } = req.body

  try {
    const user = await User.findById(req.user.id)

    const skillIndex = user.currentSkills.findIndex((s) => s.name === skillName)
    if (skillIndex !== -1) {
      user.currentSkills[skillIndex].proficiency = progress

      // Award XP for progress
      user.gamification.xpPoints += 10

      // Check if skill is mastered (100%)
      if (progress === 100 && !user.gamification.badgesEarned.includes(`mastered_${skillName}`)) {
        user.gamification.skillsMastered += 1
        user.gamification.badgesEarned.push(`mastered_${skillName}`)
        user.gamification.xpPoints += 50

        const achievement = new Achievement({
          userId: user.id,
          type: "skill_mastered",
          title: "Skill Mastered",
          description: `Mastered ${skillName}`,
          icon: "award",
          xpAwarded: 50,
        })
        await achievement.save()
      }
    }

    await user.save()
    res.json(user.gamification)
  } catch (err) {
    console.error("[v0] Update skill progress error:", err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
