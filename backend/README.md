# Backend API for Safari Date Invitation

Express backend that handles email delivery via Nodemailer.

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
PORT=3000
```

### Email Service Setup

#### For Gmail:
1. Enable 2-Factor Authentication on your Google account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an app password for "Mail"
4. Use this app password (not your regular password) in `EMAIL_PASS`

#### For Outlook/Hotmail:
1. Use your regular email and password
2. Update the transporter configuration in `server.js` (see comments)

### 3. Test Locally

```bash
npm start
# or for development with auto-reload:
npm run dev
```

Test the endpoint:
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "response_type": "YES",
    "selected_date": "Wednesday, 17th December 2025",
    "suggested_date": "Wednesday, 17th December 2025",
    "timestamp": "2025-01-01T00:00:00.000Z",
    "page_name": "Safari Date Invitation"
  }'
```

## Deployment to Render

### Step 1: Prepare Repository

1. Push your code to GitHub (or GitLab/Bitbucket)
2. Make sure `backend/` folder is in the repository

### Step 2: Create Render Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Connect your repository
4. Configure:
   - **Name**: `safari-date-backend` (or your choice)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 3: Set Environment Variables

In Render dashboard, go to **Environment** tab and add:

- `EMAIL_USER` = your email address
- `EMAIL_PASS` = your app password
- `RECIPIENT_EMAIL` = where you want to receive responses
- `NODE_ENV` = `production`

### Step 4: Deploy

1. Click **Create Web Service**
2. Wait for deployment to complete
3. Copy your service URL (e.g., `https://safari-date-backend.onrender.com`)

### Step 5: Update Frontend

Update `config.js` in the frontend with your Render backend URL:

```javascript
const API_ENDPOINT = 'https://safari-date-backend.onrender.com/api/send-email';
```

## API Endpoints

### POST `/api/send-email`

Sends an email with the form response.

**Request Body:**
```json
{
  "response_type": "YES" | "NO" | "LETS_TALK",
  "selected_date": "Wednesday, 17th December 2025",
  "suggested_date": "Wednesday, 17th December 2025",
  "alternative_date": "2025-12-17" (optional),
  "timestamp": "2025-01-01T00:00:00.000Z",
  "page_name": "Safari Date Invitation"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "..."
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

## Troubleshooting

### Email not sending
- Check that environment variables are set correctly
- Verify app password is correct (for Gmail)
- Check Render logs for error messages
- Test locally first

### CORS errors
- Backend includes CORS middleware
- Make sure frontend URL is allowed (if you add restrictions)

### Render deployment fails
- Check that `package.json` has correct start script
- Verify Node.js version (18+)
- Check build logs in Render dashboard

## Security Notes

- Never commit `.env` file to Git
- Use app passwords, not regular passwords
- Consider rate limiting for production
- Add request validation if needed

