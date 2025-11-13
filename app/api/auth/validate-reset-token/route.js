import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper function to get data directory path
function getDataDir() {
  return path.join(process.cwd(), 'data');
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Reset token is required' },
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
      const tokensPath = path.join(getDataDir(), 'reset-tokens.json');
      fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2), 'utf8');

      return NextResponse.json(
        { error: 'Reset token has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      username: tokenData.username,
    });
  } catch (error) {
    console.error('Error in validate-reset-token:', error);
    return NextResponse.json(
      { error: 'Failed to validate reset token' },
      { status: 500 }
    );
  }
}

