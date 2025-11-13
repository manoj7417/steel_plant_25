import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        excerpt: {
            type: String,
            required: [true, 'Short description is required'],
            trim: true,
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            trim: true,
        },
        author: {
            type: String,
            required: [true, 'Author is required'],
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
        },
        date: {
            type: String,
            required: [true, 'Date is required'],
            trim: true,
        },
        image: {
            type: String,
            required: [true, 'Image is required'],
            trim: true,
        },
        readTime: {
            type: String,
            required: [true, 'Read time is required'],
            trim: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Prevent model re-compilation during hot reload in development
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;

