const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ai-career-advisor", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("[v0] MongoDB Connected"))
  .catch((err) => console.error("[v0] MongoDB Connection Error:", err))

// API Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/profile", require("./routes/profile"))
app.use("/api/analysis", require("./routes/analysis"))
app.use("/api/careers", require("./routes/careers"))
app.use("/api/dashboard", require("./routes/dashboard"))
app.use("/api/chat", require("./routes/chat"))
app.use("/api/admin", require("./routes/admin"))

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`[v0] Server running on port ${PORT}`)
})
