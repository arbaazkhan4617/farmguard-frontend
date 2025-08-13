# 🚀 FarmGuard Hackathon Deployment Guide
## Quick Deployment for Syrotech MVP Hackathon 2025

This guide will help you deploy FarmGuard in under 30 minutes for your hackathon submission.

---

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Railway account (free) or Render account (free)
- Your project code ready

---

## 🎯 Step 1: Deploy Frontend to Vercel

### 1.1 Push to GitHub
```bash
cd farmguard-frontend/farmguard-frontend
git add .
git commit -m "Prepare for hackathon submission"
git push origin main
```

### 1.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL (we'll get this in step 2)
5. Click "Deploy"

**Your frontend will be live at**: `https://your-project.vercel.app`

---

## 🔧 Step 2: Deploy Backend to Railway

### 2.1 Prepare Backend
```bash
cd farmguard-backend
# Ensure requirements.txt is up to date
pip freeze > requirements.txt
```

### 2.2 Deploy to Railway
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your backend repository
4. Add environment variables:
   ```
   MODEL_PATH=./model/saved_model
   UPLOAD_DIR=./uploads
   MAX_UPLOAD_SIZE=3145728
   ```
5. Deploy

**Your backend will be live at**: `https://your-project.railway.app`

---

## 🔄 Step 3: Update Frontend API URL

1. Go back to Vercel dashboard
2. Go to your project → Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` with your Railway backend URL
4. Redeploy

---

## 🧪 Step 4: Test Your Deployment

1. **Test Frontend**: Visit your Vercel URL
2. **Test Backend**: Visit `your-backend-url/health`
3. **Test Full Flow**: Upload an image and verify disease detection works

---

## 📱 Step 5: Create Demo Video (Recommended)

### Quick Demo Script:
1. **Introduction** (30 seconds)
   - "Hi, I'm [Your Name] and this is FarmGuard"
   - "We're solving global food security through AI-powered plant disease detection"

2. **Problem Statement** (30 seconds)
   - "Plant diseases cause 40% of global crop losses"
   - "Small farmers lack access to expert diagnosis"

3. **Live Demo** (2 minutes)
   - Show the web app interface
   - Upload a test image
   - Show the AI detection results
   - Demonstrate the treatment advice

4. **Social Impact** (30 seconds)
   - "This helps farmers worldwide prevent crop losses"
   - "Contributes to feeding 9+ billion people by 2050"

5. **Closing** (30 seconds)
   - "FarmGuard - Making agriculture smarter, one plant at a time"
   - "Thank you for considering our solution!"

### Recording Tools:
- **Loom** (free, browser-based)
- **OBS Studio** (free, desktop)
- **QuickTime** (Mac, built-in)

---

## 🎯 Step 6: Submit to Hackathon

1. **Update PROJECT_SUBMISSION.md** with your actual URLs
2. **Upload demo video** to YouTube/Vimeo (unlisted)
3. **Submit on Devpost**:
   - Project name: FarmGuard
   - GitHub repo: [Your repo URL]
   - Live demo: [Your Vercel URL]
   - Demo video: [Your video URL]
   - Project write-up: Copy from PROJECT_SUBMISSION.md

---

## 🚨 Troubleshooting

### Frontend Issues:
- Check environment variables in Vercel
- Verify API URL is correct
- Check browser console for errors

### Backend Issues:
- Ensure all dependencies are in requirements.txt
- Check Railway logs for errors
- Verify environment variables are set

### Model Issues:
- Ensure model files are in the repository
- Check MODEL_PATH environment variable
- Verify model file permissions

---

## 🎉 Success!

Your FarmGuard application is now:
- ✅ **Deployed and accessible** to hackathon judges
- ✅ **Fully functional** with AI disease detection
- ✅ **Ready for demo** and evaluation
- ✅ **Meeting all hackathon requirements**

---

## 📞 Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Railway Docs**: [docs.railway.app](https://docs.railway.app)
- **FastAPI Docs**: [fastapi.tiangolo.com](https://fastapi.tiangolo.com)

**Good luck with your hackathon submission! 🌱🚀**
