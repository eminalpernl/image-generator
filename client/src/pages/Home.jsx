import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { promptTextContext, useContext } from "../context/PromptTextContext";

function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const { promptDescription, setPromptDescription } =
    useContext(promptTextContext);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3005/api/update", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result);
        console.log(result);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  function RenderCards() {
    if (allPosts?.length > 0) {
      return allPosts.map((post, index) => (
        <div className="col-6" key={index}>
          <ul className="list-group list-group-horizontal-sm">
            <li className="list-group-item">
              <img className="images" src={post} alt="Card" width={"100%"} />
            </li>
          </ul>
        </div>
      ));
    }
  }

  return (
    <div className="container home">
      <div className="row">
        <div className="col-12">
          <h1>
            The <br />
            Generated <br />
            Images
          </h1>
          <p>
            Browse through a collection of imaginative and visually stunning
            images generated by DALL-E
          </p>
        </div>

        <div className="col-12">
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <div className="row">
              <h2>Generated Images</h2>
              <RenderCards />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
