// import all npm file
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// import code file
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoute.js";
import userRoutes from "./routes/userRoutes.js";
import { app, server } from "./socket/socket.js";

// import mongodb
import ConnectMongoDB from "./db/ConnectMongodb.js";

// server setup
const PORT = process.env.PORT || 5000;

dotenv.config();
const __dirname = path.resolve();

// express json
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// api
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// server listen
server.listen(PORT, () => {
  // Database Check
  ConnectMongoDB();
  // Server Status Check
  console.log(`Server is running on port ${PORT}`);
});
