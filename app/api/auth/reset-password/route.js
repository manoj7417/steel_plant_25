import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

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
function saveAdminCredentials(username, password, email) {
  ensureDataDir();
  const credentialsPath = path.join(getDataDir(), 'admin.json');
  const existingCreds = getAdminCredentials();
  fs.writeFileSync(
    credentialsPath,
    JSON.stringify({ 
      username, 
      password,
      email: email || existingCreds.email || process.env.ADMIN_EMAIL || process.env.SMTP_USER || ''
    }, null, 2),
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
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Get reset tokens
    const tokens = getResetTokens();
    const tokenData = tokens[token];

    if (!tokenData) {
      return NextResponse.json(
        { error: 'Invalid reset token' },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (Date.now() > tokenData.expiresAt) {
      // Remove expired token
      delete tokens[token];
      saveResetTokens(tokens);

      return NextResponse.json(
        { error: 'Reset token has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Get current admin credentials
    const adminCreds = getAdminCredentials();

    // Update password (preserve email)
    saveAdminCredentials(adminCreds.username, password, adminCreds.email);

    // Remove used token
    delete tokens[token];
    saveResetTokens(tokens);

    // Clear any existing session cookies to force re-login
    // This is important for security - invalidate all existing sessions after password reset
    try {
      const cookieStore = await cookies();
      // Delete cookie with same settings as it was set (path and domain)
      cookieStore.set('admin_session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0, // Expire immediately
        path: '/',
      });
    } catch (cookieError) {
      // If cookie deletion fails, log but don't fail the request
      console.error('Error clearing session cookie:', cookieError);
    }

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    console.error('Error in reset-password:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}

