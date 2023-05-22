import { logo } from "./assets";
import { Link, Route, Routes } from "react-router-dom";
import { Home, CreatePosts } from "./pages/index";
import { useState } from "react";
import { promptTextContext } from "./context/PromptTextContext";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");

  const contextData = { prompt, setPrompt };

  return (
    <promptTextContext.Provider value={contextData}>
      <div className="App">
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              <img
                src={logo}
                alt="Logo"
                width="80"
                height="24"
                className="d-inline-block align-text-top"
              />
            </Link>
            <Link to="/create-post" className="navbar-brand">
              <button className="btn btn-primary" type="button">
                Create
              </button>
            </Link>
          </div>
        </nav>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/create-post" element={<CreatePosts />}></Route>
          </Routes>
        </main>
      </div>
    </promptTextContext.Provider>
  );
}

export default App;
