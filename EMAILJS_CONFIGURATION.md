# EmailJS Configuration - READY TO USE

## ✅ Your Credentials (Already Configured)

- **Service ID**: `service_wy0iqr9`
- **Template ID**: `template_3m5nhx9`
- **Public Key**: `9LLwjBULRKf4teFCy`

These are already set in `script.js` and ready to use!

## 📧 EmailJS Template Variables

When setting up your EmailJS template, use these variable names:

- `{{response_type}}` - "Yes 🌿" or "No 🤍"
- `{{selected_date}}` - The date she selected
- `{{suggestions}}` - Any suggestions she provided
- `{{no_reason}}` - Reason if she said No
- `{{timestamp}}` - When she submitted
- `{{page_name}}` - "DateWithYou"
- `{{message}}` - Complete message summary

## 🎯 How It Works

1. User clicks "Yes" or "No" button
2. Form data is collected (date, suggestions, reason)
3. EmailJS sends email to your inbox with all details
4. Netlify Forms also submits as backup
5. User sees confirmation message

## 📝 EmailJS Template Setup

In your EmailJS dashboard, create a template with these variables:

**Subject:** `DateWithYou - Response Received 🌿`

**Body:**
```
Response: {{response_type}}
Selected Date: {{selected_date}}
Suggestions: {{suggestions}}
Reason (if No): {{no_reason}}
Timestamp: {{timestamp}}
Page: {{page_name}}

{{message}}
```

## ✅ Status

- ✅ EmailJS SDK loaded
- ✅ Credentials configured
- ✅ Email sending function ready
- ✅ Works on desktop and mobile
- ✅ Fallback to Netlify Forms if EmailJS fails

## 🧪 Testing

1. Deploy your website
2. Click "Yes" or "No" button
3. Fill in the form
4. Submit
5. Check your email inbox!

The email will be sent immediately when the form is submitted.

