const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the 'uploads' directory exists
    const uploadDir = path.join(__dirname, "uploads");

    // Check if the 'uploads' directory exists, create it if it doesn't
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Set the destination to the 'uploads' directory
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // Add file extension
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
