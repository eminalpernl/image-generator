import React, { useState } from "react";
import { promptTextContext, useContext } from "../context/PromptTextContext";
import { preview } from "../assets";
import Loader from "../components/Loader";

function CreatePosts() {
  const [loading, setLoading] = useState(false);

  const { prompt, setPrompt } = useContext(promptTextContext);
  const [image, setImage] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [uploading, setUploading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await generateImage();
    setImage({ photo: imageUrl });
  };

  const generateImage = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://image-generator-v2.onrender.com/api/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
          }),
        }
      );
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async () => {
    try {
      setUploading(true);
      const response = await fetch(
        "https://image-generator-v2.onrender.com/api/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ImageUrl: image.photo,
            name: image.prompt,
          }),
        }
      );
      alert("upload is success");
      return response;

      //setRes(response.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container create-image">
      <div className="row gy-4 ">
        <div className="col">
          <h1>Create Image</h1>
        </div>
        <p>
          Create imaginative and visually stunning images through DALL-E and
          share them with the Community{" "}
        </p>
        <div className="col gy-4">
          <div className="row form-wrap">
            <div className="col">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Input your prompt
              </label>
              <textarea
                className="form-control mt-3 mb-3"
                id="exampleFormControlTextarea1"
                rows="5"
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
              ></textarea>
              <button
                className="col btn btn-success mt-3 mb-5"
                type="submit"
                value="Generate Image "
                onClick={onSubmit}
              >
                Generate Image
              </button>
            </div>
          </div>

          <div className="row border border-secondary">
            {image.photo ? (
              <img src={image.photo} alt={image.prompt} width={"100%"} />
            ) : (
              <>
                {loading ? (
                  <Loader />
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    width={"100%"}
                    className="opacity-25 p-5"
                  />
                )}
              </>
            )}
          </div>
          <div className="row share-button-wrap">
            <button
              type="submit"
              onClick={uploadImage}
              className={
                uploading
                  ? "btn btn-danger mt-3 mb-5"
                  : "btn btn-primary mt-4 mb-5"
              }
            >
              {uploading ? <Loader /> : "Upload to Cloudinary"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePosts;
