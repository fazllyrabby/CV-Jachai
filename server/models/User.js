const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  educationLevel: {
    type: String,
    enum: ["High School", "Associate", "Bachelor", "Master", "PhD", "Other"],
    default: "Bachelor",
  },
  experienceLevel: {
    type: String,
    enum: ["Entry Level", "Junior", "Mid-Level", "Senior", "Lead", "Executive"],
    default: "Entry Level",
  },
  currentSkills: [
    {
      name: String,
      proficiency: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
      },
    },
  ],
  careerInterests: [String],
  personalityTraits: {
    analyticalThinking: { type: Number, default: 0 },
    creativity: { type: Number, default: 0 },
    communication: { type: Number, default: 0 },
    leadership: { type: Number, default: 0 },
  },
  careerPreferences: {
    remoteWork: { type: Boolean, default: false },
    collaborative: { type: Boolean, default: false },
    continuousLearning: { type: Boolean, default: false },
    technicalChallenges: { type: Boolean, default: false },
    workLifeBalance: { type: Boolean, default: false },
  },
  gamification: {
    xpPoints: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    skillsMastered: { type: Number, default: 0 },
    badgesEarned: [String],
    dayStreak: { type: Number, default: 0 },
    lastActive: Date,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("User", UserSchema)
