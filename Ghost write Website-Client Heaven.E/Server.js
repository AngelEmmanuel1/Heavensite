const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST route to handle email sending
app.post('/send-email', (req, res) => {
    // Extract form data from request body
    const { name, email, message } = req.body;

    // Create a transporter object for sending emails
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Specify your email service provider
        auth: {
            user: 'your_email@gmail.com', // Your email address
            pass: 'your_password' // Your email password (or App Password if using Gmail)
        }
    });

    // Define email options
    const mailOptions = {
        from: `"${name}" <${email}>`, // Sender's name and email address
        to: 'recipient@example.com', // Recipient's email address
        subject: 'New Message from Contact Form', // Email subject
        text: message // Email body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        }
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

