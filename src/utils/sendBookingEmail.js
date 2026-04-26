// /utils/sendBookingEmail.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendBookingEmail = async (data) => {
  await resend.emails.send({
    from: "Abok Adventures <info@abokadventures.com>",
    to: ["info@abokadventures.com"], // you receive booking
    subject: `New Booking - ${data.safariTitle}`,

    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2 style="color:#8B4513;">New Safari Booking</h2>

        <p><strong>Safari:</strong> ${data.safariTitle}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Date:</strong> ${data.travelDate}</p>
        <p><strong>Adults:</strong> ${data.adults}</p>
        <p><strong>Children:</strong> ${data.children}</p>

        <hr />

        <p style="font-size: 14px; color: gray;">
          This booking was made on Abok Adventures website.
        </p>
      </div>
    `,
  });
};

// approval email
export const sendApprovalEmail = async (data) => {
  const response = await resend.emails.send({
    from: "Abok Adventures <info@abokadventures.com>",
    to: [data.email],
    subject: `Your Safari Booking is Confirmed 🎉`,

    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2 style="color:#16a34a;">Booking Confirmed 🎉</h2>

        <p>Hi ${data.name},</p>

        <p>Your booking for <strong>${data.safari?.safari_title || data.safariTitle}</strong> has been <strong>approved</strong>.</p>

        <p><strong>Travel Date:</strong> ${new Date(data.travelDate).toDateString()}</p>
        <p><strong>Guests:</strong> ${data.adults} Adults, ${data.children} Children</p>

        <br/>

        <p>We will contact you shortly with more details.</p>

        <hr/>

        <p style="font-size: 14px; color: gray;">
          Abok Adventures Team
        </p>
      </div>
    `,
  });

  console.log("APPROVAL EMAIL:", response);
};