import { Routes, Route } from "react-router-dom";
import { ProductListPage } from "./pages/product-list-page";
import { ProductDetailPage } from "./pages/product-detail-page";
import { CartSidebar } from "./components/ui/cart-sidebar";

function App() {
  return (
    <>
      <Routes>
        {/* Página de lista de produtos */}
        <Route path="/" element={<ProductListPage />} />

        {/* Página de detalhes do produto */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>

      {/* Sidebar do carrinho - sempre presente */}
      <CartSidebar />
    </>
  );
}

export default App;