# Fix: "Recipients address is empty" Error

## The Problem
EmailJS is showing an error because the recipient email address is not configured in your EmailJS template.

## Solution: Configure Recipient Email in EmailJS Dashboard

### Option 1: Set Recipient in Template Settings (Recommended)

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click on **"Email Templates"**
3. Find your template: `template_3m5nhx9`
4. Click **"Edit"**
5. In the template settings, find the **"To Email"** field
6. Enter **YOUR email address** where you want to receive the responses
7. Click **"Save"**

### Option 2: Use Template Variable

If you want to use a variable in the template:

1. In your EmailJS template, set **"To Email"** to: `{{to_email}}`
2. Update `script.js` line 11 with your email:
   ```javascript
   const RECIPIENT_EMAIL = 'your-actual-email@example.com';
   ```

## Quick Fix Steps

1. **Open EmailJS Dashboard**: https://dashboard.emailjs.com/admin/template
2. **Select your template** (`template_3m5nhx9`)
3. **Set "To Email"** to your email address
4. **Save the template**
5. **Test again** by clicking "Yes" or "No" on your website

## Current Configuration

- Service ID: `service_wy0iqr9`
- Template ID: `template_3m5nhx9`
- Public Key: `9LLwjBULRKf4teFCy`

The code is already set up to send emails - you just need to configure the recipient email in your EmailJS template settings!

