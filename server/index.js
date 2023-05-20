import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import generateImage from "./generate-image.js";
import connectDB from "./mongodb/connect.js";
//import postRoutes from "./routes/postRoutes.js";
import Post from "./mongodb/models/post.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const app = express();

//app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//app.use("/api/update", postRoutes);

const port = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.send("Hello world from Server");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/api/update", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.url);
  res.send(publicIds);
});

app.post("/api/generate", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const image = await generateImage(prompt);
    res.json({ response: image });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: "the image could not be generated",
    });
  }
});

app.post("/update", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => console.log(`Server started on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
