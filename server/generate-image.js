import openaiClient from "./openai-api.js";

const generateImage = async (promptDescription) => {
  const response = await openaiClient.createImage({
    prompt: promptDescription,
    n: 1,
    size: "512x512",
  });

  const image_url = response.data.data[0].url;
  return image_url;
};

export default generateImage;
