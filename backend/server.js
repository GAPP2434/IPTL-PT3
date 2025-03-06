const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, () => console.log ("Server is running on port 5000"));