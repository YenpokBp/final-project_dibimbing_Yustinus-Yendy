import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data.data));
  }, []);

  return (
    <ul>
      {products.map((p) => (
        <li key={p.product_id}>{p.product_name}</li>
      ))}
    </ul>
  );
}

export default App;