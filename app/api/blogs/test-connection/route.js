import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET() {
  try {
    // Test MongoDB connection
    await connectDB();
    
    // Test query
    const blogCount = await Blog.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      blogCount: blogCount,
      mongodbUri: process.env.MONGODB_URI ? 'Set (hidden)' : 'Not set - using fallback',
    });
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        mongodbUri: process.env.MONGODB_URI ? 'Set (hidden)' : 'Not set - using fallback',
      },
      { status: 500 }
    );
  }
}





