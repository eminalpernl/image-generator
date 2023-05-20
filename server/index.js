import express from "express";

const app = express();

app.use(express.json());

const port = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.send("Hello world from Server");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
