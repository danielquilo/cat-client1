import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

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
    <div className="App">
      <h1>CATS</h1>
      <form onSubmit={postCat}>
        <input name="name" placeholder="name" onChange={handleChange} value={form.name} />
        <input name="colour" placeholder="colour" onChange={handleChange} value={form.colour} />
        <input name="location" placeholder="location" onChange={handleChange} value={form.location} />
        <input type="submit" />
      </form>
      <br />
      <br />
      <div className="cat-wrap">
        {cats.map((cat) => {
          return (
            <div>
              <h3>{cat.name}</h3>
              <p>{cat.colour}</p>
              <p>{cat.location}</p>
              <button onClick={() => deleteCat(cat._id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;