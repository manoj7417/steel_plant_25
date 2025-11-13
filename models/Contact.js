import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
        },
        phone: {
            type: String,
            trim: true,
            default: '',
        },
        company: {
            type: String,
            trim: true,
            default: '',
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
        },
        emailSent: {
            type: Boolean,
            default: false,
        },
        emailMessageId: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Prevent model re-compilation during hot reload in development
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);

export default Contact;

