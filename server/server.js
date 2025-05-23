require('dotenv').config()

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const path = require('path');
const connectDB = require('./database');


const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});