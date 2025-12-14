# EmailJS Setup Instructions

## Overview
The website now supports EmailJS for sending email notifications when the Yes/No buttons are clicked. EmailJS is a client-side email service that doesn't require a backend.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)

### 2. Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy your **Service ID**

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template structure:

**Subject:** `DateWithYou - Response Received 🌿`

**Content:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    DATEWITHYOU - RESPONSE RECEIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Response: {{response_type}}

Selected Date: {{selected_date}}

Suggestions: {{suggestions}}

Reason (if No): {{no_reason}}

Timestamp: {{timestamp}}

Page: {{page_name}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

4. Copy your **Template ID**

### 4. Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### 5. Update script.js
Open `script.js` and update these constants at the top:

```javascript
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
```

### 6. Test
1. Deploy your website
2. Click Yes or No button
3. Check your email inbox

## Fallback
If EmailJS is not configured, the website will automatically use Netlify Forms as a fallback.

## Notes
- Free tier: 100 emails/month
- No backend required
- Works entirely client-side
- Secure (uses public key authentication)

