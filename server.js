// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Front-end folder

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
app.post('/api/process', upload.single('video'), (req, res) => {
  const videoURL = req.body.url; // URL if user pastes
  const file = req.file;         // Uploaded file
  console.log('URL:', videoURL);
  console.log('File:', file);

  // Dummy response simulating 5 shorts + captions
  const shorts = [
    { id: 1, url: '/dummy/short1.mp4', caption: 'AI IS THE FUTURE' },
    { id: 2, url: '/dummy/short2.mp4', caption: 'CREATION MADE EASY' },
    { id: 3, url: '/dummy/short3.mp4', caption: 'TRENDING NOW' },
    { id: 4, url: '/dummy/short4.mp4', caption: 'SHORTS GENERATED' },
    { id: 5, url: '/dummy/short5.mp4', caption: 'VIRAL CONTENT' },
  ];

  res.json({ success: true, shorts });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
