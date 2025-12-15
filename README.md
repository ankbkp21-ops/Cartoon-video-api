# 🎬 2D Cartoon Video API

Convert 2D cartoon images to MP4 video automatically!

## 🚀 Quick Start

### Deploy on Render (Free):
1. Fork this repo
2. Go to [render.com](https://render.com)
3. Connect GitHub → Select this repo
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Deploy!

### API Usage:
POST /generate-video  
FormData:
- images[]: PNG/JPG files (max 20)
- duration: seconds per image (default: 4)

Example cURL:
curl -X POST https://your-api.onrender.com/generate-video \
  -F "images[]=@image1.png" \
  -F "images[]=@image2.png" \
  -F "duration=4"

## 📱 Test Locally
npm install  
npm start  

## ✨ Features
- Multiple image upload (max 20)
- Custom duration per image
- Automatic MP4 generation
- CORS enabled
- Free deployment (Render/Heroku)
