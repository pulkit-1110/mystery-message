import nodemailer from 'nodemailer'
import { ApiResponse } from '@/types/ApiResponse'

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME || 'email id',
        pass: process.env.EMAIL_PASSWORD || 'password',
      },
    })

    // Define the email content
    const mailOptions = {
      from: `Mystery Message 👻" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: 'Mystery Message Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px;">
          <p>Hi ${username},</p>
          <p>Your verification code is:</p>
          <h2>${verifyCode}</h2>
          <p>Please use this code to complete your signup.</p>
          <br/>
          <p>Thanks,</p>
          <p>The Mystery Message Team</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return { success: true, message: 'Verification email sent successfully.' }
  } catch (emailError) {
    console.error('Error sending verification email:', emailError)
    return { success: false, message: 'Failed to send verification email.' }
  }
}
