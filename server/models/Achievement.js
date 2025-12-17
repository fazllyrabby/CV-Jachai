const mongoose = require("mongoose")

const AchievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["profile_created", "first_skill", "skill_mastered", "career_explored", "streak_milestone"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  icon: String,
  xpAwarded: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Achievement", AchievementSchema)
