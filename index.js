// const express = require("express");
// const dotenv = require ("dotenv");
//const connectDB = require("./config/db");
import express from "express";
import dotenv from   "dotenv";
import connectDB from "./config/db.js"
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";

//final
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"

const app = express();


dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/admin", adminRoutes);

//test route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
