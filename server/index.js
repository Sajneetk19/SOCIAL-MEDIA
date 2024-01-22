// Importing necessary packages and modules
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { posts } from "./data/index.js";
import { verifyToken } from "./middleware/auth.js";
// import Post from "./models/Post.js";
// import User from "./models/User.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
// Getting the filename and dirname for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Loading environment variables from a .env file

dotenv.config();
// Creating an Express application
const app = express();
// Using middleware for parsing JSON and enhancing security
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan());
// Configuring Express to handle large data and form submissions
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Allow requests only from http://localhost:3000 and http://localhost:3002

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// Configuring multer for handling file uploads

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
// Handling registration endpoint with file upload
app.post("/auth/register", upload.single("picture"), register);
// Handling post creation endpoint with token verification and file upload
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = 3001;
mongoose
  .connect(
    "mongodb+srv://lastmedia_2:yoyo123@cluster0.d7k1v2b.mongodb.net/lastmedia_2?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to mongodb");
    // User.insertMany(users);
    // Post.insertMany(posts);
  })

  .catch((error) => console.log(`${error} did not connect`));
// Listening for incoming requests on the specified port

app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
