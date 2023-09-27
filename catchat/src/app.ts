import cors from "cors";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

export default app;