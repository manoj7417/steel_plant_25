import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Helper function to get data directory path
function getDataDir() {
  return path.join(process.cwd(), 'data');
}

// Helper function to ensure data directory exists
function ensureDataDir() {
  const dataDir = getDataDir();
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Helper function to get admin credentials
function getAdminCredentials() {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || '';
  
  // Try to read from file if it exists
  const credentialsPath = path.join(getDataDir(), 'admin.json');
  if (fs.existsSync(credentialsPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
      return {
        username: data.username || adminUsername,
        password: data.password || adminPassword,
        email: data.email || adminEmail,
      };
    } catch (err) {
      console.error('Error reading admin credentials:', err);
    }
  }
  
  return { username: adminUsername, password: adminPassword, email: adminEmail };
}

// Helper function to save admin credentials
function saveAdminCredentials(username, password) {
  ensureDataDir();
  const credentialsPath = path.join(getDataDir(), 'admin.json');
  fs.writeFileSync(
    credentialsPath,
    JSON.stringify({ username, password }, null, 2),
    'utf8'
  );
}

// Helper function to get reset tokens
function getResetTokens() {
  const tokensPath = path.join(getDataDir(), 'reset-tokens.json');
  if (fs.existsSync(tokensPath)) {
    try {
      return JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
    } catch (err) {
      console.error('Error reading reset tokens:', err);
      return {};
    }
  }
  return {};
}

// Helper function to save reset tokens
function saveResetTokens(tokens) {
  ensureDataDir();
  const tokensPath = path.join(getDataDir(), 'reset-tokens.json');
  fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2), 'utf8');
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Get admin credentials
    const adminCreds = getAdminCredentials();

    // Get admin email (normalize for comparison)
    const adminEmail = (adminCreds.email || process.env.ADMIN_EMAIL || process.env.SMTP_USER || '').toLowerCase().trim();
    const providedEmail = email.toLowerCase().trim();

    // Verify email matches
    if (providedEmail !== adminEmail) {
      // Don't reveal if email exists for security
      return NextResponse.json({
        message: 'If the email address exists, a password reset link has been sent.',
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour from now

    // Save reset token
    const tokens = getResetTokens();
    tokens[resetToken] = {
      username: adminCreds.username,
      email: adminEmail,
      expiresAt,
      createdAt: Date.now(),
    };
    saveResetTokens(tokens);

    // Verify admin email is configured
    if (!adminEmail) {
      console.error('Admin email not configured. Please set ADMIN_EMAIL or SMTP_USER in environment variables.');
      return NextResponse.json(
        { error: 'Email configuration is missing. Please contact administrator.' },
        { status: 500 }
      );
    }

    // Generate reset link
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetLink = `${baseUrl}/admin/reset-password?token=${resetToken}`;

    // Send email with reset link
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: adminEmail, // Send to the registered admin email
        subject: 'Password Reset Request - Admin Panel',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Password Reset Request</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hello,
              </p>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                We received a request to reset the password for your admin account (<strong>${adminCreds.username}</strong>).
              </p>
              <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Click the button below to reset your password. This link will expire in 1 hour.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" 
                   style="display: inline-block; background: #ea580c; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; transition: background 0.3s;">
                  Reset Password
                </a>
              </div>
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="color: #ea580c; font-size: 14px; word-break: break-all; margin: 10px 0 0 0;">
                ${resetLink}
              </p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
              <p style="color: #9ca3af; font-size: 12px; line-height: 1.6; margin: 0;">
                If you didn't request a password reset, please ignore this email. Your password will remain unchanged.
              </p>
              <p style="color: #9ca3af; font-size: 12px; line-height: 1.6; margin: 10px 0 0 0;">
                This is an automated message. Please do not reply to this email.
              </p>
            </div>
          </div>
        `,
        text: `
Password Reset Request

Hello,

We received a request to reset the password for your admin account (${adminCreds.username}).

Click the link below to reset your password. This link will expire in 1 hour.

${resetLink}

If you didn't request a password reset, please ignore this email. Your password will remain unchanged.

This is an automated message. Please do not reply to this email.
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Password reset email sent successfully to:', adminEmail);

      return NextResponse.json({
        message: 'Password reset link has been sent to your registered email address. Please check your inbox and click the link to reset your password.',
      });
    } catch (emailError) {
      console.error('Error sending password reset email:', emailError);
      
      // In development, still return the link in the response for testing
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Reset link:', resetLink);
        return NextResponse.json({
          message: 'Password reset link generated. Email sending failed. Check server logs for the reset link.',
          resetLink,
        });
      }
      
      return NextResponse.json(
        { error: 'Failed to send password reset email. Please try again later or contact administrator.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in forgot-password:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}

