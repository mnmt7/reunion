import { useEffect, useState } from "react";

function App() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchProperties() {
      const res = await fetch("");
      const data = await res.json();
      setProperties(data);
    }

    fetchProperties();
  }, []);

  return (
    <ul>
      {properties.length === 0
        ? "No properties available"
        : properties.map((property) => (
            <li key={property._id}>
              <h1>{property.name}</h1>
              <p>{property.price}</p>
            </li>
          ))}
    </ul>
  );
}

export default App;
