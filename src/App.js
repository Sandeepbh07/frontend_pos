import "antd/dist/antd.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Items from "./pages/Items";
import CartPage from "./pages/CartPage";
import Bill from "./pages/Bill";
import Customers from "./pages/Customers";
import RegisterPage from "./pages/Register";
import Login from "./pages/Login";
import { Navigate } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoute>
                <Bill />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("pos-user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
