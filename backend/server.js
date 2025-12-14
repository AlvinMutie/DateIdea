/**
 * Express Backend for Safari Date Invitation
 * Handles email sending via Nodemailer
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Format date receipt for email
 */
function formatReceiptEmail(data) {
    const responseText = data.response_type === 'YES' 
        ? 'Yes, I\'d love to 🤍' 
        : data.response_type === 'NO' 
        ? 'Not right now' 
        : 'Can we talk first 🤍';

    return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    SAFARI DATE INVITATION - RESPONSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Response: ${responseText}

Selected Date: ${data.selected_date}

${data.alternative_date && data.alternative_date !== '' 
    ? `Alternative Date Selected: ${data.alternative_date}` 
    : 'Using suggested date'}

Timestamp: ${new Date(data.timestamp).toLocaleString()}

Page: ${data.page_name}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    This receipt confirms her response
    was received safely.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `;
}

/**
 * API endpoint to send email
 */
app.post('/api/send-email', async (req, res) => {
    try {
        const { response_type, selected_date, suggested_date, alternative_date, timestamp, page_name } = req.body;

        // Validate required fields
        if (!response_type || !selected_date) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                message: 'response_type and selected_date are required'
            });
        }

        // Prepare email content
        const receiptContent = formatReceiptEmail({
            response_type,
            selected_date,
            suggested_date,
            alternative_date,
            timestamp,
            page_name
        });

        // Email options
        const mailOptions = {
            from: `"Safari Date Invitation" <${process.env.EMAIL_USER}>`,
            to: process.env.RECIPIENT_EMAIL,
            subject: 'Safari Date Invitation - Response Received 🤍',
            text: receiptContent,
            html: `
                <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #faf8f3; color: #2c2c2c;">
                    <div style="text-align: center; border-bottom: 2px solid #9fb5a0; padding-bottom: 20px; margin-bottom: 30px;">
                        <h1 style="color: #5a7c5a; font-size: 24px; margin: 0;">Safari Date Invitation</h1>
                        <p style="color: #6b5d4f; margin: 10px 0 0 0;">Response Received</p>
                    </div>
                    
                    <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(90, 124, 90, 0.1);">
                        <div style="margin-bottom: 25px;">
                            <strong style="color: #5a7c5a; display: block; margin-bottom: 8px;">Response:</strong>
                            <p style="margin: 0; font-size: 18px; color: #2c2c2c;">
                                ${response_type === 'YES' ? 'Yes, I\'d love to 🤍' : response_type === 'NO' ? 'Not right now' : 'Can we talk first 🤍'}
                            </p>
                        </div>
                        
                        <div style="margin-bottom: 25px;">
                            <strong style="color: #5a7c5a; display: block; margin-bottom: 8px;">Selected Date:</strong>
                            <p style="margin: 0; font-size: 16px; color: #2c2c2c;">${selected_date}</p>
                        </div>
                        
                        ${alternative_date && alternative_date !== '' ? `
                        <div style="margin-bottom: 25px;">
                            <strong style="color: #5a7c5a; display: block; margin-bottom: 8px;">Alternative Date:</strong>
                            <p style="margin: 0; font-size: 16px; color: #2c2c2c;">${alternative_date}</p>
                        </div>
                        ` : ''}
                        
                        <div style="margin-bottom: 25px;">
                            <strong style="color: #5a7c5a; display: block; margin-bottom: 8px;">Timestamp:</strong>
                            <p style="margin: 0; font-size: 14px; color: #5a5a5a;">${new Date(timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #c4d5c4; color: #6b5d4f; font-size: 14px;">
                        <p style="margin: 0;">This receipt confirms her response was received safely.</p>
                    </div>
                </div>
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email sent successfully:', info.messageId);
        
        res.json({ 
            success: true, 
            message: 'Email sent successfully',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to send email',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});

