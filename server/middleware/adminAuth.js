const jwt = require("jsonwebtoken")
const User = require("../models/User")

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token")

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user

    // Check if user is admin
    const user = await User.findById(req.user.id)
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." })
    }

    next()
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" })
  }
}
