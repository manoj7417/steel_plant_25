import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to check authentication
async function checkAuth() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    return !!session;
  } catch (error) {
    return false;
  }
}

// POST - Upload image to Cloudinary (server-side)
export async function POST(request) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to upload images.' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using server-side API (no preset needed)
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'blog-images',
          resource_type: 'image',
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(
              NextResponse.json(
                { error: 'Failed to upload image to Cloudinary', details: error.message },
                { status: 500 }
              )
            );
          } else {
            console.log('Image uploaded successfully to Cloudinary:', result.secure_url);
            resolve(
              NextResponse.json({
                success: true,
                url: result.secure_url,
                public_id: result.public_id,
                width: result.width,
                height: result.height,
                format: result.format,
              })
            );
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Error in POST /api/cloudinary/upload:', error);
    return NextResponse.json(
      { error: 'Failed to process upload', details: error.message },
      { status: 500 }
    );
  }
}

// GET - Generate signed upload URL (optional, for more secure uploads)
export async function GET(request) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to get upload signature.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = searchParams.get('folder') || 'blog-images';

    // Generate signature for signed upload
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: folder,
      },
      process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      folder,
    });
  } catch (error) {
    console.error('Error in GET /api/cloudinary/upload:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload signature' },
      { status: 500 }
    );
  }
}

