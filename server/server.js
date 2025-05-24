require('dotenv').config()

const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const uploadRoute = require("./routes/uploadRoute")
const availabilityRoute = require("./routes/availabilityRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", availabilityRoute);
app.use("/upload", uploadRoute);

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});