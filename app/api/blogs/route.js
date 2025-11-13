import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

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

// GET - Fetch all blogs or a specific blog by ID
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // Find blog by MongoDB _id
      const blog = await Blog.findById(id);
      if (!blog) {
        return NextResponse.json(
          { error: 'Blog not found' },
          { status: 404 }
        );
      }
      // Convert to plain object and add id field for compatibility
      const blogObj = blog.toObject();
      blogObj.id = blogObj._id.toString();
      return NextResponse.json(blogObj);
    }

    // Fetch all blogs, sorted by createdAt descending (newest first)
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    
    // Convert to plain objects and add id field for compatibility
    const blogsWithId = blogs.map(blog => {
      const blogObj = blog.toObject();
      blogObj.id = blogObj._id.toString();
      return blogObj;
    });

    const response = NextResponse.json(blogsWithId);
    // Prevent caching to ensure fresh data
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  } catch (error) {
    console.error('Error in GET /api/blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST - Create a new blog
export async function POST(request) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to create blogs.' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();
    const { title, excerpt, content, author, category, date, image, readTime } = body;

    // Validate required fields
    if (!title || !excerpt || !content || !author || !category || !date || !image || !readTime) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create new blog
    const newBlog = await Blog.create({
      title,
      excerpt,
      content,
      author,
      category,
      date,
      image,
      readTime,
    });

    // Convert to plain object and add id field for compatibility
    const blogObj = newBlog.toObject();
    blogObj.id = blogObj._id.toString();

    return NextResponse.json(blogObj, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/blogs:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing blog
export async function PUT(request) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to update blogs.' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();
    const { id, title, excerpt, content, author, category, date, image, readTime } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // Find blog by MongoDB _id
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Update blog with new data (only update provided fields)
    if (title) blog.title = title;
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (author) blog.author = author;
    if (category) blog.category = category;
    if (date) blog.date = date;
    if (image) blog.image = image;
    if (readTime) blog.readTime = readTime;

    await blog.save();

    // Convert to plain object and add id field for compatibility
    const blogObj = blog.toObject();
    blogObj.id = blogObj._id.toString();

    return NextResponse.json(blogObj);
  } catch (error) {
    console.error('Error in PUT /api/blogs:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a blog
export async function DELETE(request) {
  try {
    // Check authentication
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login to delete blogs.' },
        { status: 401 }
      );
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    // Find and delete blog by MongoDB _id
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/blogs:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}

