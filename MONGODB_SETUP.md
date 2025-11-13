# MongoDB Setup Guide

## MongoDB Connection

Your MongoDB connection string has been configured:

```
mongodb+srv://manoj_db_user:8218923602@cluster0.muhok5l.mongodb.net/steel_plant?appName=Cluster0
```

## Setup Instructions

### 1. Environment Variables (Optional)

The MongoDB URI is already set as the default in `lib/mongodb.js`. However, for better security and flexibility, you can also set it in your `.env.local` file:

Create or update `.env.local` in the root directory:

```env
MONGODB_URI=mongodb+srv://manoj_db_user:8218923602@cluster0.muhok5l.mongodb.net/steel_plant?appName=Cluster0
```

### 2. Migrate Blog Data to MongoDB

You have two options to migrate your blog data:

#### Option A: Using Admin Panel (Recommended)

1. Log in to the admin panel at `/admin/login`
2. Click the **"Migrate Blogs to MongoDB"** button
3. Confirm the migration
4. All dummy blogs will be migrated to MongoDB

#### Option B: Using Migration API

The migration API endpoint is available at `/api/blogs/migrate` (requires authentication).

### 3. Verify Migration

After migration:
- Visit `/blogs` to see all your blogs
- Check the admin panel to see the blog count
- All blogs are now stored in MongoDB and will persist across server restarts

## Database Structure

- **Database Name**: `steel_plant`
- **Collection Name**: `blogs`
- **Model**: `Blog` (defined in `models/Blog.js`)

## Blog Schema

Each blog document contains:
- `title` (String, required)
- `excerpt` (String, required)
- `content` (String, required)
- `author` (String, required)
- `category` (String, required)
- `date` (String, required)
- `image` (String, required)
- `readTime` (String, required)
- `createdAt` (Date, auto-generated)
- `updatedAt` (Date, auto-generated)

## Notes

- The migration will skip blogs that already exist (based on title)
- All blog operations (create, read, update, delete) now use MongoDB
- The connection is cached for better performance
- The system automatically handles connection pooling

