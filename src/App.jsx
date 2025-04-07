import { useState, useEffect } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  function debounce(func, timeout) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const fetchResults = debounce((query) => {
    fetch(
      `https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`
    )
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((err) => console.error(err));
  }, 2000);

  useEffect(() => {
    if (search) {
      fetchResults(search);
    } else {
      setResults([]);
    }
  }, [search]);

  return (
    <div>
      <h3>Digita una parola chiave</h3>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cerca prodotti..."
      />
      <div>
        <h3>Suggerimenti</h3>
        {results.length > 0 ? (
          <select>
            <option>Seleziona il prodotto...</option>
            {results.map((result) => (
              <option key={result.id}>
                {result.id} - {result.name}
              </option>
            ))}
          </select>
        ) : (
          <p>Nessun risultato trovato</p>
        )}
      </div>
    </div>
  );
};

export default App;
