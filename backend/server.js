import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";  // <-- import path here
import { connectDB } from "./connection.js";
import urlRouter from "./routes/url.js";
import authRouter from "./routes/authentication.js";
import userRouter from "./routes/user.js";
import { secureRoute } from "./middlewares/auth.js";
import redirectUrlRouter from "./routes/redirecting.js";
import contactRouter from "./routes/contact.js";

connectDB();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));

// Serve uploads folder statically so avatars can be accessed publicly
app.use('/uploads', express.static(path.resolve('uploads')));

app.use('/redirect/', redirectUrlRouter);
app.use('/auth/', authRouter);
app.use('/url/', secureRoute, urlRouter);
app.use('/user/', secureRoute, userRouter);
app.use('/contact', contactRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
