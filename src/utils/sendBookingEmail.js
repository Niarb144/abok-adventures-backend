// /utils/sendBookingEmail.js

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendBookingEmail = async (data) => {
  await resend.emails.send({
    from: "Abok Adventures <info@abokadventures.com>",
    to: ["niarbyddet@gmail.com"], // you receive booking
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