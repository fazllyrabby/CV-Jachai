const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const User = require("../models/User")
const Achievement = require("../models/Achievement")

// Get User Profile
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    console.error("[v0] Get profile error:", err.message)
    res.status(500).send("Server error")
  }
})

// Update User Profile
router.put("/", auth, async (req, res) => {
  const {
    fullName,
    educationLevel,
    experienceLevel,
    currentSkills,
    careerInterests,
    personalityTraits,
    careerPreferences,
  } = req.body

  try {
    const user = await User.findById(req.user.id)

    if (fullName) user.fullName = fullName
    if (educationLevel) user.educationLevel = educationLevel
    if (experienceLevel) user.experienceLevel = experienceLevel
    if (currentSkills) user.currentSkills = currentSkills
    if (careerInterests) user.careerInterests = careerInterests
    if (personalityTraits) user.personalityTraits = personalityTraits
    if (careerPreferences) user.careerPreferences = careerPreferences

    // Award achievement for profile creation if first time
    if (!user.gamification.badgesEarned.includes("profile_created")) {
      user.gamification.badgesEarned.push("profile_created")
      user.gamification.xpPoints += 100

      const achievement = new Achievement({
        userId: user.id,
        type: "profile_created",
        title: "Profile Created",
        description: "Created your career profile",
        icon: "user",
        xpAwarded: 100,
      })
      await achievement.save()
    }

    await user.save()
    res.json(user)
  } catch (err) {
    console.error("[v0] Update profile error:", err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
