import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

// Helper function to get admin credentials (checks file first, then env vars)
function getAdminCredentials() {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || '';
  
  // Try to read from file if it exists (for password reset functionality)
  const credentialsPath = path.join(process.cwd(), 'data', 'admin.json');
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

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Get credentials (from file if exists, otherwise from env vars)
    const adminCreds = getAdminCredentials();

    // Validate credentials
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (username === adminCreds.username && password === adminCreds.password) {
      // Create a simple session token (in production, use JWT or proper session management)
      const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      
      // Set cookie (in production, use httpOnly, secure, sameSite flags)
      const cookieStore = await cookies();
      cookieStore.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return NextResponse.json({ 
        success: true, 
        message: 'Login successful' 
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

