import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config(); // Load environment variables from .env file
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
if(process.env.NODE_ENV !== "production") {
    app.use(cors({origin: "http://localhost:5173"})); // Allow requests from this origin (frontend server)
};

app.use(express.json()); // Middleware to parse JSON bodies, this will allow us to get access to req.body
app.use(rateLimiter);

// Prefixing /api/notes
app.use("/api/notes", notesRoutes); // 

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
};

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server started on PORT: 5001");
    });
});

