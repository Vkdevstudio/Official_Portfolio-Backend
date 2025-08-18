const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendUserContactAcknowledgment = async ({ userEmail, userName }) => {
  const mailOptions = {
    from: `"Support Team" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "We received your query",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <p>Hi ${userName || "there"},</p>
        <p>Thank you for contacting us. We have received your query and will get back to you shortly.</p>
        <br/>
        <p>Best regards,<br/>Support Team</p>
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

// 2️⃣ Reference email to admin
const sendAdminContactReference = async ({ userName, userEmail, message }) => {
  const mailOptions = {
    from: `"Website Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL, // Set your admin email in .env
    subject: `New Contact Query from ${userName || userEmail}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h3>New Contact Us Query</h3>
        <p><strong>Name:</strong> ${userName || "N/A"}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
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

module.exports = { sendUserContactAcknowledgment, sendAdminContactReference };
