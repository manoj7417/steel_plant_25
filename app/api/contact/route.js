import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, company, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required fields' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await connectDB();

        // Save contact submission to database
        let savedContact;
        try {
            savedContact = await Contact.create({
                name,
                email,
                phone: phone || '',
                company: company || '',
                message,
                emailSent: false,
            });
            console.log('Contact saved to database:', savedContact._id);
        } catch (dbError) {
            console.error('Error saving to database:', dbError);
            // Continue with email sending even if database save fails
        }

        // Create transporter using environment variables
        // For production, use your SMTP credentials
        // For development, you can use Ethereal Email (test account)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.ethereal.email',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content for the company (admin notification)
        const adminMailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                        <p><strong>Message:</strong></p>
                        <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px; border-left: 4px solid #ea580c;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                        This email was sent from the contact form on your website.
                    </p>
                </div>
            `,
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${company ? `Company: ${company}` : ''}

Message:
${message}
            `,
        };

        // Email content for the user (confirmation)
        const userMailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Thank you for contacting us - MTP LLP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">
                        Thank You for Contacting Us!
                    </h2>
                    <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
                        <p>Dear ${name},</p>
                        <p>Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.</p>
                        <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 15px; border-left: 4px solid #ea580c;">
                            <p><strong>Your Message:</strong></p>
                            <p>${message.replace(/\n/g, '<br>')}</p>
                        </div>
                        <p style="margin-top: 20px;">Best regards,<br><strong>MTP LLP Team</strong></p>
                    </div>
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
                        <p><strong>Our Contact Information:</strong></p>
                        <p>Email: info@mtpllp.com</p>
                        <p>Address: Door No. 11-4-3/10 2nd floor, Vridhi Chambers, Rockdale layout, Vishakapatanam – 530002, Andhra Pradesh</p>
                    </div>
                </div>
            `,
            text: `
Thank You for Contacting Us!

Dear ${name},

Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.

Your Message:
${message}

Best regards,
MTP LLP Team

Our Contact Information:
Email: info@mtpllp.com
Address: Door No. 11-4-3/10 2nd floor, Vridhi Chambers, Rockdale layout, Vishakapatanam – 530002, Andhra Pradesh
            `,
        };

        // Send both emails
        let adminInfo, userInfo;
        try {
            [adminInfo, userInfo] = await Promise.all([
                transporter.sendMail(adminMailOptions),
                transporter.sendMail(userMailOptions),
            ]);

            // Update contact record with email status if it was saved
            if (savedContact) {
                await Contact.findByIdAndUpdate(savedContact._id, {
                    emailSent: true,
                    emailMessageId: adminInfo.messageId,
                });
            }

            return NextResponse.json(
                {
                    success: true,
                    message: 'Email sent successfully and contact saved to database',
                    messageId: adminInfo.messageId,
                    contactId: savedContact?._id,
                },
                { status: 200 }
            );
        } catch (emailError) {
            console.error('Error sending email:', emailError);

            // Update contact record to indicate email failed
            if (savedContact) {
                await Contact.findByIdAndUpdate(savedContact._id, {
                    emailSent: false,
                });
            }

            // Still return success if data was saved, but note email issue
            if (savedContact) {
                return NextResponse.json(
                    {
                        success: true,
                        message: 'Contact saved to database, but email sending failed',
                        contactId: savedContact._id,
                        warning: 'Email could not be sent. Please check your SMTP configuration.',
                    },
                    { status: 200 }
                );
            }

            throw emailError;
        }
    } catch (error) {
        console.error('Error processing contact form:', error);
        return NextResponse.json(
            {
                error: 'Failed to process your request. Please try again later.',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined,
            },
            { status: 500 }
        );
    }
}

