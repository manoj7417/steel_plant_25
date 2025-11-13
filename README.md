This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Contact Form Setup

This project uses Nodemailer to send emails and MongoDB to store contact form submissions.

### Environment Variables

1. Create a `.env.local` file in the root directory
2. Add the following environment variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/steel_plant

# SMTP Configuration for Nodemailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### MongoDB Setup

1. **Install MongoDB** (if not already installed):

   - Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud): [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Start MongoDB** (for local installation):

   ```bash
   # Windows
   mongod

   # macOS/Linux
   sudo systemctl start mongod
   # or
   brew services start mongodb-community
   ```

3. **Default Connection**:

   - The default connection string is `mongodb://localhost:27017/steel_plant`
   - You can customize it by setting `MONGODB_URI` in `.env.local`
   - The database name is `steel_plant` (you can change it in the connection string)

4. **Database Features**:
   - All contact form submissions are automatically saved to MongoDB
   - Each submission includes: name, email, phone, company, message, timestamps
   - Email sending status is tracked (`emailSent`, `emailMessageId`)
   - Data persists even if email sending fails

### For Gmail:

- Enable 2-Step Verification on your Google account
- Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
- Use the app password as `SMTP_PASS`

### For Development/Testing:

You can use [Ethereal Email](https://ethereal.email) for testing:

- Visit https://ethereal.email/create
- Use the provided credentials in your `.env.local` file

### Features:

- **Database Storage**: All contact form submissions are saved to MongoDB
- **Email Notifications**: Sends notification email to admin (SMTP_USER email address)
- **User Confirmation**: Sends confirmation email to the user
- **Email Tracking**: Tracks email sending status in the database
- **HTML & Plain Text**: Both email formats included
- **Error Handling**: Graceful error handling for both database and email operations
- **Data Persistence**: Submissions are saved even if email sending fails

## Cloudinary Image Management

This project uses Cloudinary for optimized image delivery and management for blog images.

### Cloudinary Setup

1. **Create a Cloudinary Account**:
   - Sign up for free at [cloudinary.com](https://cloudinary.com)
   - Get your Cloud Name, API Key, and API Secret from the dashboard

2. **Environment Variables**:
   Add the following to your `.env.local` file:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Create Upload Preset**:
   - Go to your Cloudinary Dashboard > Settings > Upload
   - Click "Add upload preset"
   - Name it: `blog_images`
   - Set it as "Unsigned" (for client-side uploads)
   - Set folder to: `blog-images` (optional)
   - Save the preset

4. **Features**:
   - **CldUploadWidget**: Upload images directly to Cloudinary from the admin panel
   - **CldImage**: Automatically optimized images with Cloudinary transformations
   - **Backward Compatible**: Still supports local images and URLs
   - **Automatic Optimization**: Images are automatically optimized for web delivery

### Image Upload Options

In the admin panel, you can upload images in three ways:
- **Upload to Cloudinary**: Direct upload to Cloudinary (recommended)
- **Select from URL**: Choose from existing local images
- **Upload Base64**: Upload as base64 string (legacy support)

## Blog Management System

This project includes a fully functional blog management system with authentication.

### Blog Features

- **Blog Listing**: View all blogs at `/blogs`
- **Blog Details**: View individual blog posts at `/blogs/[id]`
- **Admin Panel**: Manage blogs at `/admin` (requires login)
- **JSON Storage**: All blog data is stored in `/data/blogs.json`

### Admin Authentication

1. **Login Page**: Navigate to `/admin/login`
2. **Default Credentials** (for development):
   - Username: `admin`
   - Password: `admin123`

3. **Customize Credentials**: Add to your `.env.local` file:
   ```env
   ADMIN_USERNAME=your_username
   ADMIN_PASSWORD=your_secure_password
   ```

4. **Session Management**: 
   - Sessions are stored in HTTP-only cookies
   - Sessions expire after 7 days
   - Logout button available in the admin panel

### Blog API

The blog system uses RESTful API endpoints:

- `GET /api/blogs` - Get all blogs
- `GET /api/blogs?id=[id]` - Get a specific blog
- `POST /api/blogs` - Create a new blog (requires authentication)
- `PUT /api/blogs` - Update a blog (requires authentication)
- `DELETE /api/blogs?id=[id]` - Delete a blog (requires authentication)

### Blog Data Structure

Each blog post contains:
```json
{
  "id": number,
  "title": string,
  "excerpt": string,
  "content": string,
  "author": string,
  "category": string,
  "date": string,
  "image": string,
  "readTime": string
}
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Important:** Don't forget to add your environment variables in the Vercel dashboard under Project Settings > Environment Variables:
- `ADMIN_USERNAME` - Your admin username
- `ADMIN_PASSWORD` - Your admin password
- `MONGODB_URI` - MongoDB connection string
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Email configuration
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `NEXT_PUBLIC_CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
