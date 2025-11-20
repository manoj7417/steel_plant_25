# Production Troubleshooting Guide - Blogs Not Showing

## Issue
Blogs are not appearing on your production site (https://www.mtpllp.com/blogs)

## Common Causes & Solutions

### 1. MongoDB Environment Variable Not Set in Vercel

**Problem**: The `MONGODB_URI` environment variable is not configured in Vercel, causing connection failures.

**Solution**:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name**: `MONGODB_URI`
   - **Value**: `mongodb+srv://manoj_db_user:8218923602@cluster0.muhok5l.mongodb.net/steel_plant?appName=Cluster0`
   - **Environment**: Select all (Production, Preview, Development)
4. **Redeploy** your application after adding the variable

### 2. MongoDB Atlas IP Whitelist Restrictions

**Problem**: MongoDB Atlas might be blocking connections from Vercel's IP addresses.

**Solution**:
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Navigate to **Network Access** (or **IP Access List**)
3. Click **Add IP Address**
4. Add `0.0.0.0/0` to allow connections from anywhere (recommended for serverless)
   - **OR** add Vercel's IP ranges (less secure but more restrictive)
5. Wait a few minutes for changes to propagate

### 3. No Blogs in Database

**Problem**: The database might be empty or blogs haven't been migrated yet.

**Solution**:
1. Log in to your admin panel at `https://www.mtpllp.com/admin/login`
2. Click the **"Migrate Blogs to MongoDB"** button (if available)
3. Or manually create blogs through the admin panel
4. Verify blogs exist by checking the blog count in the admin dashboard

### 4. Test Your Connection

After making the above changes, test your MongoDB connection:

1. Visit: `https://www.mtpllp.com/api/blogs/test-connection`
2. You should see a JSON response with:
   ```json
   {
     "success": true,
     "message": "MongoDB connection successful",
     "blogCount": <number>,
     "mongodbUri": "Set (hidden)"
   }
   ```

### 5. Check Vercel Logs

1. Go to your Vercel project dashboard
2. Navigate to **Deployments** → Select your latest deployment → **Functions** tab
3. Check the logs for any MongoDB connection errors
4. Look for error messages like:
   - "MongoDB connection error"
   - "Database connection failed"
   - "Authentication failed"

### 6. Verify Environment Variables Are Applied

After adding environment variables in Vercel:
- **Important**: You must redeploy for changes to take effect
- Go to **Deployments** → Click the three dots on your latest deployment → **Redeploy**

## Quick Checklist

- [ ] `MONGODB_URI` environment variable is set in Vercel
- [ ] Environment variable is set for Production environment
- [ ] Application has been redeployed after adding environment variable
- [ ] MongoDB Atlas IP whitelist allows `0.0.0.0/0` or Vercel IPs
- [ ] Blogs exist in the database (check via admin panel)
- [ ] Test connection endpoint returns success: `/api/blogs/test-connection`
- [ ] Check Vercel function logs for errors

## Testing Steps

1. **Test Connection**: Visit `https://www.mtpllp.com/api/blogs/test-connection`
2. **Test API**: Visit `https://www.mtpllp.com/api/blogs` (should return JSON array)
3. **Test Page**: Visit `https://www.mtpllp.com/blogs` (should show blogs)

## Additional Notes

- The MongoDB connection string is currently hardcoded as a fallback in `lib/mongodb.js`
- For better security, always use environment variables in production
- MongoDB Atlas free tier has connection limits - check if you've exceeded them
- Vercel serverless functions have cold starts - first request might be slower

## Need More Help?

If issues persist:
1. Check Vercel function logs for detailed error messages
2. Verify MongoDB Atlas cluster is running and accessible
3. Test the connection locally with the same connection string
4. Check if the database name and collection name are correct






