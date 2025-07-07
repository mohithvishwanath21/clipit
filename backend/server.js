import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";  // for static file serving

import { connectDB } from "./connection.js";
import urlRouter from "./routes/url.js";
import authRouter from "./routes/authentication.js";
import userRouter from "./routes/user.js";
import { secureRoute } from "./middlewares/auth.js";
import redirectUrlRouter from "./routes/redirecting.js";
import contactRouter from "./routes/contact.js";
app.use("/avatars", express.static("avatars"));
// Connect to DB
connectDB();

const PORT = process.env.PORT || 4000;
const app = express();

// Allow JSON and cookies
app.use(express.json());
app.use(cookieParser());

// ✅ CORS: Allow local & deployed frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://clipit-5l2g.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed from this origin: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

// ✅ Serve static uploads (e.g., avatar images)
app.use('/uploads', express.static(path.resolve('uploads')));

// ✅ Routers
app.use('/redirect/', redirectUrlRouter);
app.use('/auth/', authRouter);
app.use('/url/', secureRoute, urlRouter);
app.use('/user/', secureRoute, userRouter);
app.use('/contact', contactRouter);

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
