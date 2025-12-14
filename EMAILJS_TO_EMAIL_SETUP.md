# How to Set "To Email" in EmailJS Template Dashboard

## Step-by-Step Instructions

### Step 1: Log into EmailJS Dashboard
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Log in to your account

### Step 2: Navigate to Email Templates
1. In the left sidebar, click on **"Email Templates"**
2. You should see your template: `template_3m5nhx9` (or click "Create New Template" if you haven't created one yet)

### Step 3: Edit Your Template
1. Click on your template (`template_3m5nhx9`) to open it
2. You'll see the template editor with fields for:
   - **Template Name**
   - **Subject**
   - **Content** (email body)
   - **To Email** ← **THIS IS WHAT WE NEED TO SET!**
   - **From Name**
   - **Reply To**

### Step 4: Set the "To Email" Field
1. Look for the **"To Email"** field in the template editor
2. Enter your email address where you want to receive the responses
   - Example: `your-email@gmail.com` or `your-email@outlook.com`
3. **Important:** You can either:
   - **Option A:** Enter your email directly (static)
   - **Option B:** Use a variable like `{{to_email}}` if you want it dynamic (but we're using Option 1, so just enter your email directly)

### Step 5: Configure Other Template Fields

**Subject:**
```
DateWithYou - Response Received 🌿
```

**Content (Email Body):**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    DATEWITHYOU - RESPONSE RECEIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Response: {{response_type}}

Selected Date: {{selected_date}}
Selected Time: {{selected_time}}

Suggestions: {{suggestions}}

Reason (if No): {{no_reason}}

Timestamp: {{timestamp}}

Page: {{page_name}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{message}}
```

**From Name:**
```
DateWithYou Website
```

**Reply To:**
```
{{reply_to}}
```
(Or you can set this to your email address directly)

### Step 6: Save the Template
1. Click the **"Save"** button at the bottom of the template editor
2. Make sure you see a success message confirming the template was saved

### Step 7: Test It!
1. Deploy your website (or test locally)
2. Click the "Yes" or "No" button
3. Fill in the form and submit
4. Check your email inbox - you should receive the email!

## Visual Guide (What to Look For)

In the EmailJS template editor, you'll see something like this:

```
┌─────────────────────────────────────┐
│ Template Name: template_3m5nhx9     │
├─────────────────────────────────────┤
│ To Email: [your-email@example.com]  │ ← SET THIS!
│ From Name: [DateWithYou Website]    │
│ Reply To: [your-email@example.com] │
│ Subject: [DateWithYou - Response...]│
│ Content: [Your email template...]   │
└─────────────────────────────────────┘
```

## Troubleshooting

### If you don't see "To Email" field:
- Make sure you're editing the template, not just viewing it
- Some EmailJS interfaces show it as "To" or "Recipient Email"
- Check if you need to click "Advanced Settings" or "Show More Options"

### If emails still don't send:
1. Verify your email service is connected (go to "Email Services" and check `service_wy0iqr9`)
2. Check the browser console for any error messages
3. Make sure your Public Key is correct: `9LLwjBULRKf4teFCy`
4. Verify the template ID matches: `template_3m5nhx9`

### Common Issues:
- **"Recipient address is empty"** → Make sure "To Email" field is filled in the template
- **"Service not found"** → Check that your Service ID is correct
- **"Template not found"** → Verify your Template ID matches

## Quick Checklist

- [ ] Logged into EmailJS dashboard
- [ ] Opened template `template_3m5nhx9`
- [ ] Set "To Email" field to your email address
- [ ] Added all template variables ({{response_type}}, {{selected_date}}, etc.)
- [ ] Saved the template
- [ ] Tested by clicking Yes/No button on website
- [ ] Received email in inbox ✅

## Need Help?

If you're still having issues:
1. Check the browser console (F12) for error messages
2. Verify all your EmailJS credentials match:
   - Service ID: `service_wy0iqr9`
   - Template ID: `template_3m5nhx9`
   - Public Key: `9LLwjBULRKf4teFCy`
3. Make sure your email service is active in EmailJS

Once you set the "To Email" in the template dashboard, the website will automatically use it and you won't need to configure anything in the code!

