const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();

router.get("/available", async (req, res) => {
    const { date, shift, role } = req.query;

    if (!date || !shift || !role) {
        return res.status(400).json({success: false, error: "Missing query parameters"});
    }

    try {
        const available = await Employee.find({
            role,
            [`schedule.${date}`]: shift,
        }).select("name role");
    } catch (error) {
        console.error("Error fetching availability:", err);
        res.status(500).json({success: false, error: "Server error"});
    }
});

module.exports = router;