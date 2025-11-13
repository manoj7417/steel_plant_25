# Cloudinary Setup Guide

## Step 1: Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com) and sign up for a free account
2. After signing up, you'll be taken to your dashboard

## Step 2: Get Your Credentials
1. In your Cloudinary dashboard, you'll see your **Cloud Name**, **API Key**, and **API Secret**
2. Copy these values (you'll need them in the next step)

## Step 3: Set Environment Variables
1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Important:** 
- Replace `your_cloud_name_here`, `your_api_key_here`, and `your_api_secret_here` with your actual values
- The `NEXT_PUBLIC_` prefix is required for client-side access
- Never commit `.env.local` to git (it should be in `.gitignore`)

## Step 4: Create Upload Preset
1. In your Cloudinary dashboard, go to **Settings** → **Upload**
2. Scroll down to **Upload presets** section
3. Click **Add upload preset**
4. Configure the preset:
   - **Preset name:** `blog_images` (must match exactly)
   - **Signing mode:** Select **Unsigned** (important for client-side uploads)
   - **Folder:** `blog-images` (optional, but recommended for organization)
   - **Resource type:** Image
5. Click **Save**

## Step 5: Restart Your Development Server
After setting up environment variables, restart your Next.js development server:
```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## Step 6: Test the Upload
1. Go to `/admin` page (login if needed)
2. Click "Add New Blog"
3. Select "Upload to Cloudinary" option
4. Click "Upload Image to Cloudinary" button
5. Select an image and upload
6. Check your Cloudinary dashboard → **Media Library** to see the uploaded image

## Troubleshooting

### Images not appearing in Cloudinary dashboard:
1. **Check environment variables:**
   - Make sure `.env.local` exists in the root directory
   - Verify all three variables are set correctly
   - Restart the dev server after adding/changing env variables

2. **Check upload preset:**
   - Go to Cloudinary Dashboard → Settings → Upload
   - Verify the preset name is exactly `blog_images`
   - Make sure it's set to **Unsigned** (not Signed)
   - Check that Resource type is set to "Image"

3. **Check browser console:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for any error messages when uploading
   - Check Network tab to see if upload requests are being made

4. **Verify Cloudinary credentials:**
   - Double-check your Cloud Name, API Key, and API Secret
   - Make sure there are no extra spaces or quotes in `.env.local`

5. **Check upload widget:**
   - The upload widget should open when you click the button
   - If it doesn't open, check the browser console for errors
   - Make sure you're not blocking popups

### Common Errors:

**Error: "Upload preset not found"**
- Solution: Create the upload preset `blog_images` in Cloudinary dashboard

**Error: "Invalid API key"**
- Solution: Check your API key in `.env.local` matches your Cloudinary dashboard

**Error: "Cloud name is required"**
- Solution: Make sure `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set in `.env.local` and server is restarted

**Widget doesn't open:**
- Solution: Check browser console for JavaScript errors
- Make sure `next-cloudinary` package is installed: `npm install next-cloudinary`

## Verification Checklist
- [ ] Cloudinary account created
- [ ] Environment variables added to `.env.local`
- [ ] Development server restarted after adding env variables
- [ ] Upload preset `blog_images` created and set to Unsigned
- [ ] Can see upload button in admin panel
- [ ] Upload widget opens when clicking the button
- [ ] Image uploads successfully
- [ ] Image appears in Cloudinary Media Library
- [ ] Image URL is saved in blog form

## Need Help?
- Check Cloudinary documentation: https://cloudinary.com/documentation
- Check Next Cloudinary docs: https://next.cloudinary.dev
- Review browser console for specific error messages

