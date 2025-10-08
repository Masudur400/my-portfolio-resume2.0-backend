 
import { ContactData } from "./contact.interface";
import nodemailer from "nodemailer";

const sendContactMailService = async (data: ContactData) => {
  const transporter = nodemailer.createTransport({
    host:  process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"${data.name}" <${data.email}>`,
    to: process.env.SMTP_TO,
    subject: data.subject,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    html: `<p><strong>Name:</strong> ${data.name}</p>
           <p><strong>Email:</strong> ${data.email}</p>
           
           <p>${data.message}</p>`,
  };
// <p><strong>Message:</strong></p>
  return transporter.sendMail(mailOptions);
};


export const contactServices = {
    sendContactMailService
}