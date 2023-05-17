import { Link } from "react-router-dom";

export default function Home({ cats, form, handleChange, postCat, deleteCat }) {
  return (
    <div>
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
            <div key={cat._id}>
              <h3>
                <Link to={`/cat/${cat._id}`}>{cat.name}</Link>
              </h3>
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