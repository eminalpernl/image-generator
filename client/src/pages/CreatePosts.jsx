import React, { useState } from "react";
import { promptTextContext, useContext } from "../context/PromptTextContext";
//import FormField from "../components/FormField";
import { preview } from "../assets";

function CreatePosts() {
  const { promptDescription, setPromptDescription } =
    useContext(promptTextContext);
  //const [promptDescription, setPromptDescription] = useState("");
  const [image, setImage] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [flagGenerating, setFlagGenerating] = useState(false);

  const onSubmit = () => {};

  return (
    <section className="container  text-center create-post-wrap">
      <div className="row row-cols-1 gy-4">
        <div className="col create-post-wrap-description pt-5">
          <h1>Create Image</h1>
        </div>
        <div className="col">
          <p>
            Create imaginative and visually stunning images through DALL-E and
            share them with the Community{" "}
          </p>
        </div>
        <form className="col" onSubmit={onSubmit}>
          <div className="row row-cols-1 gy-4">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Input your prompt
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => {
                  setPromptDescription(e.target.value);
                }}
              ></textarea>
            </div>
            <input
              className="col btn btn-success"
              type="submit"
              value="Generate Image "
            />
            <div className="col border border-secondary">
              {image.photo ? (
                <img src={image.photo} alt={image.prompt} width={"100%"} />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  width={"100%"}
                  className="opacity-25 p-5"
                />
              )}
            </div>
          </div>
        </form>
        <div className="col share-button-wrap">
          <button type="submit" className="btn btn-primary mt-3 mb-5">
            Share with the Community
          </button>
        </div>
      </div>
    </section>
  );
}

export default CreatePosts;