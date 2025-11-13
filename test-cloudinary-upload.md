# Cloudinary Upload Test Checklist

## Pre-Test Setup Verification

### 1. Environment Variables Check
- [ ] `.env.local` file exists in project root
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set
- [ ] `NEXT_PUBLIC_CLOUDINARY_API_KEY` is set  
- [ ] `CLOUDINARY_API_SECRET` is set
- [ ] Development server was restarted after adding env variables

### 2. Cloudinary Dashboard Check
- [ ] Upload preset `blog_images` exists
- [ ] Preset is set to **Unsigned** (not Signed)
- [ ] Preset folder is set to `blog-images` (optional)
- [ ] Resource type is set to "Image"

### 3. Package Installation
- [ ] `next-cloudinary` package is installed (version 6.17.4)
- [ ] Run `npm list next-cloudinary` to verify

## Manual Test Steps

### Step 1: Access Admin Page
1. Navigate to `http://localhost:3000/admin/login`
2. Login with credentials:
   - Username: `admin`
   - Password: `admin123`
3. Should redirect to `/admin` page

### Step 2: Open Blog Form
1. Click "Add New Blog" button
2. Verify form appears
3. Check that "Upload to Cloudinary" tab is selected (default)

### Step 3: Test Cloudinary Upload
1. Click "Upload Image to Cloudinary" button
2. **Expected**: Cloudinary upload widget modal should open
3. Select an image file (JPG, PNG, etc.)
4. Wait for upload to complete
5. **Expected**: 
   - Success message appears: "Image uploaded successfully to Cloudinary!"
   - Green box appears showing "✓ Cloudinary Image Selected"
   - Image preview shows the uploaded image
   - Console shows: "Upload success - Full result:" and "Setting Cloudinary URL:"

### Step 4: Verify Image URL
1. Check browser console (F12 → Console tab)
2. Look for log: "Setting Cloudinary URL: https://res.cloudinary.com/..."
3. Verify the URL starts with `https://res.cloudinary.com/`
4. Copy the URL and verify it's accessible in browser

### Step 5: Submit Blog
1. Fill in other required fields:
   - Title: "Test Blog"
   - Excerpt: "Test excerpt"
   - Content: "Test content"
   - Author: "Test Author"
   - Category: Select any category
   - Date: Current date
   - Read Time: "5 min"
2. Click "Create Blog"
3. **Expected**: 
   - Success message: "Blog created successfully!"
   - Console shows: "Blog saved successfully. Image URL: https://res.cloudinary.com/..."

### Step 6: Verify in Database
1. Check MongoDB database
2. Find the newly created blog
3. Verify `image` field contains Cloudinary URL (not base64)
4. URL should be: `https://res.cloudinary.com/[cloud_name]/image/upload/...`

### Step 7: Verify in Cloudinary Dashboard
1. Go to Cloudinary Dashboard → Media Library
2. Navigate to `blog-images` folder
3. **Expected**: Your uploaded image should be visible there

## Browser Console Checks

Open DevTools (F12) and check for:

### Success Indicators:
- ✅ "Upload widget opened"
- ✅ "Upload success - Full result: {info: {secure_url: '...'}}"
- ✅ "Setting Cloudinary URL: https://res.cloudinary.com/..."
- ✅ "Submitting blog with image: https://res.cloudinary.com/..."
- ✅ "Blog saved successfully. Image URL: https://res.cloudinary.com/..."

### Error Indicators:
- ❌ "Cloudinary cloud name not found"
- ❌ "Upload error: ..."
- ❌ "No image URL found in result"
- ❌ "Upload preset not found"
- ❌ "Invalid API key"

## Network Tab Checks

1. Open DevTools → Network tab
2. Filter by "cloudinary"
3. When uploading, you should see:
   - Request to `https://api.cloudinary.com/v1_1/[cloud_name]/image/upload`
   - Status: 200 OK
   - Response contains `secure_url` field

## Common Issues & Solutions

### Issue: Widget doesn't open
**Solution**: 
- Check browser console for JavaScript errors
- Verify `next-cloudinary` is installed
- Check if popups are blocked

### Issue: Upload fails with "Upload preset not found"
**Solution**:
- Verify preset name is exactly `blog_images`
- Check preset exists in Cloudinary dashboard
- Ensure preset is set to "Unsigned"

### Issue: Image saves as base64 instead of Cloudinary URL
**Solution**:
- Check console logs to see if upload succeeded
- Verify the `onSuccess` callback is being called
- Check that `result.info.secure_url` exists in the result
- Make sure you're using "Upload to Cloudinary" tab, not "Upload Base64"

### Issue: "Cloudinary Not Configured" warning
**Solution**:
- Verify `.env.local` file exists
- Check environment variable names are correct
- Restart development server after adding env variables

## Automated Test Script (for Playwright)

If you want to automate this test with Playwright, here's what to test:

```javascript
// Test flow:
1. Navigate to /admin/login
2. Fill username: "admin", password: "admin123"
3. Click login button
4. Wait for redirect to /admin
5. Click "Add New Blog" button
6. Verify "Upload to Cloudinary" tab is visible and selected
7. Click "Upload Image to Cloudinary" button
8. Wait for Cloudinary widget to appear (iframe or modal)
9. Upload a test image file
10. Wait for success message
11. Verify image URL in form contains "cloudinary.com"
12. Fill other blog fields
13. Submit form
14. Verify success message
15. Check that blog was created with Cloudinary URL (not base64)
```

## Expected Results Summary

✅ **All Good If:**
- Widget opens successfully
- Image uploads to Cloudinary
- URL is saved to MongoDB (not base64)
- Image appears in Cloudinary Media Library
- Image displays correctly on blog pages

❌ **Needs Fix If:**
- Widget doesn't open
- Upload fails
- Base64 is saved instead of URL
- Image doesn't appear in Cloudinary dashboard
- Console shows errors

