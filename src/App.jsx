import { useState, useEffect } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (search) {
      fetch(
        `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${search}`
      )
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => console.error(err));
    } else {
      setResults([]);
    }
  }, [search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cerca prodotti..."
      />
      <select>
        {results.map((result) => {
          return (
            <option key={result.id}>
              {result.id} - {result.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default App;
