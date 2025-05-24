const fs = require("fs");
const path = require("path");
const xlsx= require("xlsx");
const Employee = require("../models/Employee");

const parseExcel = (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet, {header: 1});

    // Find header row and actual data rows

    const [header, ...rows] = jsonData;

    const dateHeaders = header.slice(2);

    const employees = [];

    for (const row of rows) {
        const [name, role, ...shifts] = row;
        if (!name || !role) continue;

        const schedule = {};

        for (let i = 0; i < shifts.length; i++) {
            const day = i + 1;
            const date = `2025-06-${String(day).padStart(2, "0")}`;
            schedule[date] = shifts[i];
        }
        employees.push({ name, roles, schedule});
    }

    return employees;

};

const handleUpload = async (req, res) => {
    try {
        const filePath = path.join(__dirname, "..", req.file.path);

        const employees = parseExcel(filePath);

        await Employee.deleteMany();
        await Employee.insertMany();

        res.status(200).json({sucess: true, count: employees.length, sample: employees.slice(0, 3) });
    } catch (error) {
        console.error("Excel upload error: ", err);
        res.status(500).json({success: false, error: "Failed to parse Excel file"});
    }
};

module.exports = {handleUpload};