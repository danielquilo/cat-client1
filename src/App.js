import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CatPage from "./pages/CatPage";


function App() {
  const [cats, setCats] = useState([]);
  const [form, setForm] = useState({
    name: "",
    colour: "",
    hasClaws: true,
    location: "",
  });

  useEffect(() => {
    getCats();
  }, []);

  async function getCats() {
    const API = "http://localhost:8080/cats";
    const res = await axios.get(API);
    setCats(res.data);
  }

  async function deleteCat(id) {
    const API = `http://localhost:8080/cats/${id}`;
    await axios.delete(API);
    getCats();
  }

  async function postCat(event) {
    event.preventDefault();
    const API = "http://localhost:8080/cats";
    await axios.post(API, form);
    getCats();
    setForm({
      name: "",
      colour: "",
      hasClaws: true,
      location: "",
    });
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <BrowserRouter>
      <div className="App">
        <h1>CATS</h1>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Routes>
          <Route
            path="/"
            element={<Home cats={cats} form={form} handleChange={handleChange} postCat={postCat} deleteCat={deleteCat} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/cat/:id" element={<CatPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;