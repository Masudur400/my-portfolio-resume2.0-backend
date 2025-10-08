"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactServices = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendContactMailService = async (data) => {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST,
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
exports.contactServices = {
    sendContactMailService
};
