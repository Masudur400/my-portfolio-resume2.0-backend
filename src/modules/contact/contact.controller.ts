import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { contactServices } from "./contact.service";

const sendContactMail = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "All fields are required",
        data: null,
      });
    }

    // Send email using service
    await contactServices.sendContactMailService({ name, email, subject, message });

    // Success response
    return res.status(httpStatus.OK).json({
      success: true,
      message: "Message sent successfully",
      data: null,
    });
  } catch (error: any) {
    console.error("Error sending contact mail:", error);

    // Error response
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to send message",
      data: error?.message || null,
    });
  }
};

export const contactControllers = {
  sendContactMail,
};
