"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerMiddleware = exports.authMiddleware = void 0;
const jwt_1 = require("../modules/utils/jwt");
const authMiddleware = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (Array.isArray(authHeader))
        authHeader = authHeader[0];
    if (typeof authHeader === "string") {
        token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    }
    if (!token && req.headers["x-access-token"]) {
        const xToken = req.headers["x-access-token"];
        token = Array.isArray(xToken) ? xToken[0] : xToken;
    }
    if (!token && req.query.token) {
        token = req.query.token;
    }
    if (!token) {
        return res.status(401).json({ success: false, message: "No token provided" });
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token, process.env.JWT_SECRET || "");
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
const ownerMiddleware = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== "OWNER") {
        return res.status(403).json({ success: false, message: "Access denied" });
    }
    next();
};
exports.ownerMiddleware = ownerMiddleware;
