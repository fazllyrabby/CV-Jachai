const mongoose = require("mongoose")

const CareerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salaryRange: {
    min: Number,
    max: Number,
  },
  jobGrowth: {
    type: String,
    default: "+0%",
  },
  requiredSkills: [
    {
      name: String,
      level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "intermediate",
      },
      priority: {
        type: String,
        enum: ["required", "preferred"],
        default: "required",
      },
    },
  ],
  category: {
    type: String,
    enum: ["Technology", "Business", "Creative", "Healthcare", "Engineering", "Other"],
    default: "Technology",
  },
  icon: String,
})

module.exports = mongoose.model("Career", CareerSchema)
