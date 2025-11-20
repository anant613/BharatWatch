import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import errorHandler from "./middlewares/errors.middleware.js";
import snipRoutes from "./routes/snips.routes.js";
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";

const app = express();

// Security middleware
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === "production" ? 100 : 1000,
    message: "Too many requests from this IP",
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Compression
app.use(compression());

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === "production" 
    ? process.env.ALLOWED_ORIGINS?.split(',') || []
    : ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400 // 24 hours
}));

// Body parsing middleware
app.use(express.json({ 
    limit: "10mb",
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieparser());

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API routes

///    origin: [
   //     "http://localhost:3000",
     //   "http://localhost:5173",
     //   "http://localhost:5174"
   // ,
 //   credentials: true,
 //   methods: ["GET", "POST", "PUT", "DELETE"],
 //   allowedHeaders: ["Content-Type", "Authorization"]
//}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieparser());

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.use("/api/snips", snipRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);

// Root endpoint
app.get("/", (req, res) => {
    res.json({
        message: "BharatWatch API",
        version: "1.0.0",
        status: "running"
    });
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export { app };
