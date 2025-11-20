import rateLimit from "express-rate-limit";
import { ApiError } from "../utils/ApiError.js";

// Rate limiting for authentication endpoints
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === "production" ? 5 : 50, // 50 attempts in dev, 5 in production
    message: "Too many authentication attempts, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
});

// Rate limiting for video uploads
export const uploadLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 uploads per hour
    message: "Upload limit exceeded, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiting for general API requests
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === "production" ? 100 : 1000,
    message: "Too many requests from this IP",
    standardHeaders: true,
    legacyHeaders: false,
});

// Security headers middleware
export const securityHeaders = (req, res, next) => {
    // Remove server header
    res.removeHeader('X-Powered-By');
    
    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    if (process.env.NODE_ENV === 'production') {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    
    next();
};

// Request size limiter
export const requestSizeLimiter = (req, res, next) => {
    const contentLength = parseInt(req.get('Content-Length'));
    const maxSize = 10 * 1024 * 1024; // 10MB for regular requests
    
    if (contentLength && contentLength > maxSize) {
        throw new ApiError(413, "Request entity too large");
    }
    
    next();
};
