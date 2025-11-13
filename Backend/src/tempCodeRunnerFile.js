import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"
import errorHandler from "./middlewares/errors.middleware.js";

const app = express();

app.use(cors({
    origin:[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174"
        // production url
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieparser());

app.get("/", (req, res) => {
    res.send("Hello World")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})



import userRouter from "./routes/user.routes.js";


app.use("/api/v1/users", userRouter);





app.use(errorHandler);
export { app };
