import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CatPage() {
  const [cat, setCat] = useState({});
  const [form, setForm] = useState({
    name: "",
    colour: "",
    location: "",
  });

  const { id } = useParams();
  // const id = useParams().id;

  useEffect(() => {
    getCat();
  }, []);

  async function getCat() {
    const API = `http://localhost:8080/cats?_id=${id}`;
    const res = await axios.get(API);
    setCat(res.data[0]);
    setForm({
      name: res.data[0].name,
      colour: res.data[0].colour,
      location: res.data[0].location,
    });
  }

  async function updateCat(event) {
    event.preventDefault();
    const API = `http://localhost:8080/cats/${id}`;

    // you could look at form, and remove all blank properties so they aren't sent in the body to update the cat

    await axios.put(API,form);
    getCat();
  }

  function handleChange(event) {
    const newForm = { ...form, [event.target.name]: event.target.value };
    setForm(newForm);
  }

  return (
    <div>
      <h2>{cat.name}</h2>
      <p>{cat.colour}</p>
      <p>{cat.location}</p>
      <form onSubmit={updateCat}>
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} />
        <input name="colour" placeholder="Colour" onChange={handleChange} value={form.colour} />
        <input name="location" placeholder="Location" onChange={handleChange} value={form.location} />
        <input type="submit" />
      </form>
    </div>
  );
}