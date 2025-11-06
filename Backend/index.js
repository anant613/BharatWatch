import express from "express"
import cors from "cors"

const app = express()
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
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello World")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})