import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import errorHandler from "./middlewares/errors.middleware.js";
import snipRoutes from "./routes/snips.routes.js";
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";

const app = express();

app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieparser());

import userRouter from "./routes/user.routes.js";


app.use("/api/snips", snipRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

app.use(errorHandler);
export { app };