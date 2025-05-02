const express = require("express")
const router = express.Router()
const Activity = require("../models/Activity") // Assuming you have an Activity model

// @route   GET /api/activities
// @desc    Get all activities
// @access  Public
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find()
    res.status(200).json(activities)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch activities", error: err.message })
  }
})

// @route   POST /api/activities
// @desc    Add a new activity
// @access  Public
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
    })

    const savedActivity = await newActivity.save()
    res.status(201).json(savedActivity)
  } catch (err) {
    res.status(500).json({ message: "Failed to add activity", error: err.message })
  }
})

// @route   PUT /api/activities/:id
// @desc    Update an activity
// @access  Public
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const updates = req.body

  try {
    const updatedActivity = await Activity.findByIdAndUpdate(id, updates, { new: true })
    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" })
    }
    res.status(200).json(updatedActivity)
  } catch (err) {
    res.status(500).json({ message: "Failed to update activity", error: err.message })
  }
})

// @route   DELETE /api/activities/:id
// @desc    Delete an activity
// @access  Public
router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const deletedActivity = await Activity.findByIdAndDelete(id)
    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" })
    }
    res.status(200).json({ message: "Activity deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: "Failed to delete activity", error: err.message })
  }
})

module.exports = router