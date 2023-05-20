import { useState } from "react";
import { Loader, RenderCards } from "../components";
import { promptTextContext, useContext } from "../context/PromptTextContext";

function Home() {
  const [loading, setLoading] = useState(false);

  const { promptDescription, setPromptDescription } =
    useContext(promptTextContext);

  return (
    <div className="container home">
      <div className="row row-cols-1 gy-4 home-enrty">
        <h1 className="col pt-5 mt-5 pb-3">The Community Showcase</h1>
        <p className="col">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E
        </p>
        <label htmlFor="posts-list" className="form-label">
          Search Posts
        </label>
        <input
          className="form-control"
          list="posts-list"
          id="exampleDataList"
          placeholder="Type to search..."
        />
        <div className="col loading">
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <>
              <h2>Showing Result</h2>
              <div className="filtered-images">
                <RenderCards />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;