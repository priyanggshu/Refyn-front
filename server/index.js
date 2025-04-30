import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "./config/passport.js"
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import migrationRoutes from "./routes/migrationRoutes.js"
import schemaRoutes from "./routes/schemaRoutes.js";


dotenv.config();
const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later."
})

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/migration', migrationRoutes);
app.use('/schema', schemaRoutes);

app.get('/', (req, res) => {
    res.send("Running ✅");
})

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));