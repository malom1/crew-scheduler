const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const path = require('path');


const app = express();

app.use(cors());
app.use(express.json());

// set up storage and uploaded files