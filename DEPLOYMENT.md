# Complete Deployment Guide

This guide walks you through deploying both the frontend (Netlify) and backend (Render).

## Prerequisites

- GitHub account (or GitLab/Bitbucket)
- Netlify account (free tier works)
- Render account (free tier works)
- Email account (Gmail recommended for ease of setup)

## Part 1: Backend Deployment (Render)

### Step 1: Prepare Backend

1. **Set up environment variables locally:**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your email credentials
   ```

2. **Test locally:**
   ```bash
   npm install
   npm start
   ```

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add backend"
   git push origin main
   ```

### Step 2: Deploy to Render

1. **Create New Web Service:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **New +** → **Web Service**
   - Connect your GitHub repository

2. **Configure Service:**
   - **Name**: `safari-date-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid if preferred)

3. **Set Environment Variables:**
   In the **Environment** tab, add:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   RECIPIENT_EMAIL=your-email@gmail.com
   NODE_ENV=production
   ```

4. **Deploy:**
   - Click **Create Web Service**
   - Wait for deployment (2-3 minutes)
   - Copy your service URL: `https://safari-date-backend.onrender.com`

### Step 3: Get Gmail App Password

1. Go to [Google Account](https://myaccount.google.com)
2. Enable 2-Factor Authentication
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate password for "Mail"
5. Use this password in `EMAIL_PASS` (not your regular password)

## Part 2: Frontend Deployment (Netlify)

### Step 1: Update API Endpoint

1. **Edit `config.js`:**
   ```javascript
   const API_ENDPOINT = 'https://safari-date-backend.onrender.com/api/send-email';
   ```
   (Replace with your actual Render URL)

2. **Commit changes:**
   ```bash
   git add config.js
   git commit -m "Update API endpoint"
   git push origin main
   ```

### Step 2: Deploy to Netlify

#### Option A: Deploy via Dashboard

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Connect your GitHub repository
4. Configure:
   - **Build command**: (leave empty - static site)
   - **Publish directory**: `.` (root)
5. Click **Deploy site**

#### Option B: Deploy via CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Part 3: Testing

### Test Backend

1. **Health Check:**
   ```bash
   curl https://safari-date-backend.onrender.com/api/health
   ```

2. **Test Email:**
   ```bash
   curl -X POST https://safari-date-backend.onrender.com/api/send-email \
     -H "Content-Type: application/json" \
     -d '{
       "response_type": "YES",
       "selected_date": "Wednesday, 17th December 2025",
       "suggested_date": "Wednesday, 17th December 2025",
       "timestamp": "2025-01-01T00:00:00.000Z",
       "page_name": "Safari Date Invitation"
     }'
   ```

3. **Check your email** for the receipt

### Test Frontend

1. Visit your Netlify site URL
2. Fill out the form
3. Submit a response
4. Verify:
   - Receipt appears on screen
   - Email is received
   - All animations work smoothly

## Troubleshooting

### Backend Issues

**Email not sending:**
- Check Render logs: Dashboard → Your service → Logs
- Verify environment variables are set
- Test with a simple curl request
- Check spam folder

**Service sleeping (free tier):**
- First request after inactivity may be slow
- Consider upgrading or using a keep-alive service

### Frontend Issues

**Form not submitting:**
- Check browser console for errors
- Verify `config.js` has correct API endpoint
- Check Network tab for API calls

**Text not appearing:**
- Wait 2-5 seconds (fallback animations will show content)
- Check browser console for JavaScript errors
- Ensure all files are in the same directory

## Cost

- **Netlify**: Free tier (100GB bandwidth, 300 build minutes)
- **Render**: Free tier (sleeps after 15 min inactivity)
- **Email**: Free (Gmail/Outlook)

Total: **$0/month** (free tier)

---

**Need help?** Check the backend README: `backend/README.md`

