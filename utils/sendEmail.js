import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({quiet:true})

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


export const sendUserContactAcknowledgment = async ({ userEmail, userName }) => {
  const mailOptions = {
    from: `"Vinod Manimaran" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Message Received – Vinod Manimaran Portfolio",
    html: `
      <span style="display:none; font-size:1px; color:#fff; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
        Your message has been received. Vinod Manimaran will get back to you shortly.
      </span>

      <div style="font-family:'Segoe UI', sans-serif; max-width:600px; margin:auto; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08); background:#f7f8fa;">

        <!-- Header -->
        <div style="background:#C0C0C0; padding:30px; text-align:center; color:#333;">
          <h1 style="margin:0; font-size:26px; font-weight:600;">Thank You for Reaching Out!</h1>
        </div>

        <!-- Body -->
        <div style="padding:30px; background:#fff; color:#333; line-height:1.6; font-size:16px;">
          <p>Hi <strong>${userName || "there"}</strong>,</p>
          <p>Thank you for contacting me through my portfolio website. Your message has been successfully received, and I will get back to you shortly.</p>

          <!-- Divider -->
          <hr style="border:none; border-top:1px solid #C0C0C0; margin:25px 0;" />

          <!-- LinkedIn / Action -->
          <p style="text-align:center; margin:10px 0;">
            <a href="https://linkedin.com/in/vinod-manimaran" 
               style="display:inline-block; background:#0077b5; color:#fff; text-decoration:none; padding:12px 28px; border-radius:6px; font-weight:600; transition:all 0.3s ease;">
               Connect on LinkedIn
            </a>
          </p>

          <p>Best regards,<br/><strong>Vinod Manimaran</strong></p>
        </div>

        <!-- Footer -->
        <div style="padding:15px; text-align:center; font-size:12px; color:#555; background:#f0f0f0; line-height:1.4;">
          This is an automated acknowledgment from my portfolio website.<br/>
          Visit my portfolio: 
          <a href="https://projectsbyvinodmanimaran.vercel.app" style="color:#1a73e8; text-decoration:none;">projectsbyvinodmanimaran.vercel.app</a>
        </div>

      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Acknowledgment email sent to ${userEmail}`);
  } catch (err) {
    console.error("Failed to send acknowledgment email:", err);
    throw new Error("Failed to send email");
  }
};



export const sendAdminContactReference = async ({ userName, userEmail, message }) => {
  const mailOptions = {
    from: `"Vinod Manimaran Portfolio" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Message from Portfolio Website: ${userName || userEmail}`,
    html: `
      <div style="font-family:'Segoe UI', sans-serif; max-width:650px; margin:auto; border-radius:12px; overflow:hidden; box-shadow:0 6px 24px rgba(0,0,0,0.08); background:#f7f8fa;">

        <!-- Header -->
        <div style="background:#C0C0C0; padding:30px; text-align:center; color:#333;">
          <h1 style="margin:0; font-size:26px; font-weight:600;">New Contact Form Submission</h1>
        </div>

        <!-- Body -->
        <div style="padding:30px; background:#fff; color:#333; font-size:16px; line-height:1.6;">
          <p style="margin-bottom:10px;"><strong>Submitted By:</strong> ${userName || "N/A"}</p>
          <p style="margin-bottom:10px;"><strong>Email:</strong> ${userEmail}</p>
          <p style="margin-bottom:10px;"><strong>Message:</strong></p>
          <div style="padding:15px; background:#e8e8e8; border-radius:8px; white-space:pre-wrap; font-size:15px; color:#111;">${message}</div>

          <!-- Divider -->
          <hr style="border:none; border-top:1px solid #C0C0C0; margin:30px 0;" />

          <p style="margin-bottom:10px;"><strong>Submission Details:</strong></p>
          <ul style="margin:0; padding-left:20px; font-size:15px; color:#555;">
            <li>Form Type: Portfolio Contact / Enquiry</li>
            <li>Submission Date: ${new Date().toLocaleString()}</li>
            <li>Source: Portfolio Website</li>
          </ul>

          <!-- Action Button -->
          <p style="text-align:center; margin-top:30px;">
            <a href="https://projectsbyvinodmanimaran.vercel.app" 
               style="display:inline-block; background:#1a73e8; color:#fff; text-decoration:none; padding:14px 32px; border-radius:6px; font-weight:600; font-size:16px; transition:all 0.3s ease;">
               View Portfolio
            </a>
          </p>
        </div>

        <!-- Footer -->
        <div style="padding:20px; text-align:center; font-size:12px; color:#555; background:#f0f0f0;">
          This email was automatically generated from your portfolio website's contact form.
        </div>

      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reference email sent to admin`);
  } catch (err) {
    console.error("Failed to send reference email to admin:", err);
    throw new Error("Failed to send email");
  }
};





