const express = require("express")
const router = express.Router()
const Activity = require("../models/Activity")

// Get all activities
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: 1, time: 1 })
    res.json(activities)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get activity by ID
router.get("/:id", async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" })
    }
    res.json(activity)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Create a new activity
router.post("/", async (req, res) => {
  const { title, description, type, date, time, duration, capacity, location } = req.body

  try {
    const newActivity = new Activity({
      title,
      description,
      type,
      date,
      time,
      duration,
      capacity,
      location,
      participants: 0,
    })

    const activity = await newActivity.save()
    res.status(201).json(activity)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Update an activity
router.put("/:id", async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" })
    }

    res.json(activity)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Delete an activity
router.delete("/:id", async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id)

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" })
    }

    res.json({ message: "Activity deleted successfully" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
})

// Get activity statistics for admin dashboard
router.get("/stats/overview", async (req, res) => {
  try {
    const totalActivities = await Activity.countDocuments()
    const totalFitness = await Activity.countDocuments({ type: "fitness" })
    const totalCreative = await Activity.countDocuments({ type: "creative" })
    const totalTherapy = await Activity.countDocuments({ type: "therapy" })
    const totalSocial = await Activity.countDocuments({ type: "social" })
    const totalHealth = await Activity.countDocuments({ type: "health" })

    // Get upcoming activities (next 5)
    const today = new Date()
    const formattedDate = today.toISOString().split("T")[0]

    const upcomingActivities = await Activity.find({
      date: { $gte: formattedDate },
    })
      .sort({ date: 1, time: 1 })
      .limit(5)

    res.json({
      totalActivities,
      totalFitness,
      totalCreative,
      totalTherapy,
      totalSocial,
      totalHealth,
      upcomingActivities,
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = router
