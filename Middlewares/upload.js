const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Yeh path automatically Hostinger ke server structure ke hisaab se adjust ho jayega
const uploadDir = "/home/u118145129/public_html/uploads/influencers";// Ensure folder exists on Hostinger
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Unique filename with original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
module.exports = upload;