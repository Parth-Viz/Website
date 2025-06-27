const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API endpoint to list images in an album
app.get('/api/images', async (req, res) => {
  const album = req.query.album;
  if (!album) return res.status(400).json({ error: 'Missing album parameter' });

  const albumDir = path.join(__dirname, 'public/images/travel', album);

  try {
    const files = await fs.readdir(albumDir);
    const imageFiles = files.filter(f =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(f)
    );
    res.json(imageFiles);
  } catch (err) {
    res.json([]);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));