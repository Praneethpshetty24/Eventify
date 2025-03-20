import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

// Verify email connection on server start
try {
  transporter.verify(function (error, success) {
    if (error) {
      console.error('Email configuration error:', error);
    } else {
      console.log('Server is ready to send emails');
    }
  });
} catch (error) {
  console.error('Email verification failed:', error);
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: {
        name: 'Eventify',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: 'Welcome to Eventify! 🎉✨',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #9333ea; margin-bottom: 10px;">Welcome to Eventify! 🎉✨</h1>
            <p style="color: #4b5563; font-size: 16px;">Your journey to amazing events begins here 🚀</p>
          </div>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #374151; font-size: 16px;">With Eventify, you can:</p>
            <ul style="color: #4b5563;">
              <li>Create and manage your own events 🎟️</li>
              <li>Connect with other event organizers 🤝</li>
              <li>Discover exciting events near you 🌍</li>
              <li>Support events you care about ❤️</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #4b5563;">Best regards,<br>The Eventify Team 🌟</p>
          </div>
        </div>
      `
    };

    // Send email and wait for response
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Detailed email error:', {
      message: error.message,
      code: error.code,
      response: error.response
    });
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
}