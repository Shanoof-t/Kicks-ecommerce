import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar/Navbar";
import AllCatogories from "./pages/Categories/AllCatogories";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails";
function App() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="all" element={<AllCatogories />} />
        <Route path="all/:productId" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
