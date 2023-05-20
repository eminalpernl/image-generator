import generateImage from "./generate-image.js";
import express from "express";

const app = express();

app.use(express.json());

const port = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.send("Hello world from Server");
});

app.post("/generate", async (req, res) => {
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

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
