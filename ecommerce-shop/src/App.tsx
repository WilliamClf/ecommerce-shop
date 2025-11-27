import { Routes, Route } from "react-router-dom";
import { ProductListPage } from "./pages/product-list-page";
import { ProductDetailPage } from "./pages/product-detail-page";
import { LoginPage } from "./pages/login-page";
import { RegisterPage } from "./pages/register-page";
import { CheckoutPage } from "./pages/checkout-page";
import { CartSidebar } from "./components/ui/cart-sidebar";
import { PrivateRoute } from "./components/private-route";

function App() {
  return (
    <>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rotas protegidas */}
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* Sidebar do carrinho - sempre presente */}
      <CartSidebar />
    </>
  );
}

export default App;