const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    name: String,
    role: String,
    schedule: {
        type: Map,
        of: String,
    },
});

module.exports = mongoose.model("Employee", scheduleSchema);