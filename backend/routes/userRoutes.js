const express = require("express")
const router = express.Router()
const User = require("../models/User")

// Register a new user
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, phone, role, password, confirmPassword } = req.body

  if (!firstName || !lastName || !email || !password || !confirmPassword || !phone || !role) {
    return res.status(400).json({ message: "Please fill in all fields", code: 400 })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match", code: 400 })
  }

  try {
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "User already exists", code: 403 })
    }

    user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      role,
    })

    await user.save()
    res.status(201).json({
      message: "User registered successfully",
      user: {
        firstname: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      success: true,
    })
    console.log("User registered successfully")
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error: " + err })
  }
})

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  // console.log(email, password);
  try {
    const user = await User.findOne({ email })
    if (!user || user.password !== password) return res.status(400).json({ message: "Invalid credentials", code: 403 })
    console.log("User logged in successfully")
    res.json({ message: "Login successful", user, code: 201, success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get all users (for admin)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password")
    res.json(users)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = router
