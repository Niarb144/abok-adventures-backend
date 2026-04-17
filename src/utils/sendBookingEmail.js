import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "abokadventures.com", // or smtp.yourprovider.com
  port: 465, // usually 465 (SSL) or 587 (TLS)
  secure: true, // true for 465
  auth: {
    user: "booking@abokadventures.com",
    pass: process.env.EMAIL_PASS,
  },
});

export const sendBookingEmail = async (data) => {
  const mailOptions = {
    from: "booking@adbokadventures.com",
    to: "info@abokadventures.com", // YOU receive the booking
    subject: `New Booking - ${data.safariTitle}`,
    html: `
      <h2>New Safari Booking</h2>
      <p><strong>Safari:</strong> ${data.safariTitle}</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Date:</strong> ${data.travelDate}</p>
      <p><strong>Adults:</strong> ${data.adults}</p>
      <p><strong>Children:</strong> ${data.children}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};