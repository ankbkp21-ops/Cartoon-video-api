const express = require('express');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Create directories
['uploads', 'public'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    message: '2D Cartoon Video API is LIVE! 🎬',
    endpoints: ['POST /generate-video']
  });
});

// Generate video endpoint
app.post('/generate-video', upload.array('images', 20), (req, res) => {
  try {
    const duration = parseInt(req.body.duration) || 4;
    const images = req.files.map(file => path.join(__dirname, file.path));
    const outputPath = path.join(__dirname, 'public/output.mp4');

    console.log(`Generating video with ${images.length} images, ${duration}s each`);

    ffmpeg()
      .addInput(images[0])
      .loop(duration * 1000)
      .inputFPS(1)
      .output(outputPath)
      .on('end', () => {
        res.json({ 
          success: true, 
          downloadUrl: `https://${req.get('host')}/output.mp4`,
          totalDuration: images.length * duration + ' seconds'
        });
        
        // Cleanup
        images.forEach(img => fs.unlinkSync(img));
      })
      .on('error', (err) => {
        res.status(500).json({ error: 'Video generation failed' });
      })
      .run();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT}`);
  console.log(`📱 Test: http://localhost:${PORT}`);
});
