import { Routes, Route } from "react-router-dom";
import { ProductListPage } from "./pages/product-list-page";
import { ProductDetailPage } from "./pages/product-detail-page";

function App() {
  return (
    <Routes>
      {/* Página de lista de produtos */}
      <Route path="/" element={<ProductListPage />} />

      {/* Página de detalhes do produto */}
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}

export default App;