import { ApiError } from "../utils/ApiError.js";

// Email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// Sanitize input
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/[<>]/g, '');
};

// User registration validation middleware
export const validateUserRegistration = (req, res, next) => {
    try {
        const { fullName, email, password, confirmpassword } = req.body;

        // Check required fields
        if (!fullName || !email || !password || !confirmpassword) {
            return next(new ApiError(400, "All fields are required"));
        }

    // Sanitize inputs
    req.body.fullName = sanitizeInput(fullName);
    req.body.email = sanitizeInput(email).toLowerCase();

        // Validate email
        if (!validateEmail(req.body.email)) {
            return next(new ApiError(400, "Invalid email format"));
        }

        // Validate password
        if (!validatePassword(password)) {
            return next(new ApiError(400, "Password must be at least 8 characters with uppercase, lowercase, and number"));
        }

        // Check password match
        if (password !== confirmpassword) {
            return next(new ApiError(400, "Passwords do not match"));
        }

        // Check name length
        if (req.body.fullName.length < 2 || req.body.fullName.length > 50) {
            return next(new ApiError(400, "Full name must be between 2 and 50 characters"));
        }

        next();
    } catch (error) {
        next(new ApiError(500, "Validation error: " + error.message));
    }
};

// User login validation middleware
export const validateUserLogin = (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ApiError(400, "Email and password are required"));
        }

        req.body.email = sanitizeInput(email).toLowerCase();

        if (!validateEmail(req.body.email)) {
            return next(new ApiError(400, "Invalid email format"));
        }

        next();
    } catch (error) {
        next(new ApiError(500, "Validation error: " + error.message));
    }
};

// Video upload validation middleware
export const validateVideoUpload = (req, res, next) => {
    const { title, description } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required");
    }

    req.body.title = sanitizeInput(title);
    req.body.description = sanitizeInput(description);

    if (req.body.title.length < 3 || req.body.title.length > 150) {
        throw new ApiError(400, "Title must be between 3 and 150 characters");
    }

    if (req.body.description.length < 10 || req.body.description.length > 5000) {
        throw new ApiError(400, "Description must be between 10 and 5000 characters");
    }

    next();
};
