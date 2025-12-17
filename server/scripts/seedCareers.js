const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Career = require("../models/Career")

dotenv.config()

const careers = [
  {
    title: "Full Stack Developer",
    description: "Build end-to-end web applications using modern technologies",
    salaryRange: { min: 70000, max: 120000 },
    jobGrowth: "+22%",
    requiredSkills: [
      { name: "JavaScript", level: "advanced", priority: "required" },
      { name: "React", level: "advanced", priority: "required" },
      { name: "Node.js", level: "intermediate", priority: "required" },
      { name: "SQL", level: "intermediate", priority: "required" },
      { name: "Git", level: "intermediate", priority: "required" },
    ],
    category: "Technology",
    icon: "code",
  },
  {
    title: "Product Manager",
    description: "Drive product strategy and coordinate cross-functional teams",
    salaryRange: { min: 90000, max: 140000 },
    jobGrowth: "+19%",
    requiredSkills: [
      { name: "Project Management", level: "advanced", priority: "required" },
      { name: "Communication", level: "advanced", priority: "required" },
      { name: "Business Strategy", level: "intermediate", priority: "required" },
    ],
    category: "Business",
    icon: "briefcase",
  },
  {
    title: "Data Scientist",
    description: "Extract insights from data using statistical analysis and ML",
    salaryRange: { min: 80000, max: 150000 },
    jobGrowth: "+31%",
    requiredSkills: [
      { name: "Python", level: "advanced", priority: "required" },
      { name: "Machine Learning", level: "advanced", priority: "required" },
      { name: "Data Analysis", level: "advanced", priority: "required" },
      { name: "SQL", level: "intermediate", priority: "required" },
    ],
    category: "Technology",
    icon: "chart",
  },
  {
    title: "UX Designer",
    description: "Design user-centered digital experiences and interfaces",
    salaryRange: { min: 65000, max: 110000 },
    jobGrowth: "+16%",
    requiredSkills: [
      { name: "UI/UX Design", level: "advanced", priority: "required" },
      { name: "Figma", level: "advanced", priority: "required" },
      { name: "User Research", level: "intermediate", priority: "required" },
    ],
    category: "Creative",
    icon: "palette",
  },
  {
    title: "DevOps Engineer",
    description: "Automate deployment and manage cloud infrastructure",
    salaryRange: { min: 75000, max: 130000 },
    jobGrowth: "+25%",
    requiredSkills: [
      { name: "Docker", level: "advanced", priority: "required" },
      { name: "Kubernetes", level: "intermediate", priority: "required" },
      { name: "AWS", level: "intermediate", priority: "required" },
      { name: "CI/CD", level: "intermediate", priority: "required" },
    ],
    category: "Technology",
    icon: "server",
  },
]

const seedCareers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ai-career-advisor")

    console.log("[v0] MongoDB Connected")

    await Career.deleteMany({})
    console.log("[v0] Cleared existing careers")

    await Career.insertMany(careers)
    console.log("[v0] Seeded careers successfully")

    process.exit(0)
  } catch (err) {
    console.error("[v0] Seed error:", err)
    process.exit(1)
  }
}

seedCareers()
