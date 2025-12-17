const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

// Simple chatbot responses (in production, integrate with AI service)
router.post("/", auth, async (req, res) => {
  const { message } = req.body

  try {
    // Simple rule-based responses
    let response = "That's an interesting question! Can you tell me more?"

    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("career") || lowerMessage.includes("job")) {
      response =
        "I can help you explore career options! Check out the Careers page to see roles that match your skills."
    } else if (lowerMessage.includes("skill") || lowerMessage.includes("learn")) {
      response =
        "Great question! Focus on building skills that align with your career goals. Check your Analysis page for personalized recommendations."
    } else if (lowerMessage.includes("help")) {
      response = "I'm here to help! You can ask me about career paths, skill development, or navigating the platform."
    }

    res.json({ response })
  } catch (err) {
    console.error("[v0] Chat error:", err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
