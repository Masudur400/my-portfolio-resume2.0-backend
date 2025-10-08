"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const contact_service_1 = require("./contact.service");
const sendContactMail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        // Validate required fields
        if (!name || !email || !subject || !message) {
            return res.status(http_status_codes_1.default.BAD_REQUEST).json({
                success: false,
                message: "All fields are required",
                data: null,
            });
        }
        // Send email using service
        await contact_service_1.contactServices.sendContactMailService({ name, email, subject, message });
        // Success response
        return res.status(http_status_codes_1.default.OK).json({
            success: true,
            message: "Message sent successfully",
            data: null,
        });
    }
    catch (error) {
        console.error("Error sending contact mail:", error);
        // Error response
        return res.status(http_status_codes_1.default.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to send message",
            data: (error === null || error === void 0 ? void 0 : error.message) || null,
        });
    }
};
exports.contactControllers = {
    sendContactMail,
};
