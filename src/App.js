import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails";
import MenCategories from "./pages/Categories/Men Categories/MenCategories";
import WomenCategories from "./pages/Categories/Women Categories/WomenCategories";
import MenCasual from "./pages/Categories/Men Categories/MenCasual";
import MenFootball from "./pages/Categories/Men Categories/MenFootball";
import MenRunning from "./pages/Categories/Men Categories/MenRunning";
import WomenCasual from "./pages/Categories/Women Categories/WomenCasual";
import WomenFootball from "./pages/Categories/Women Categories/WomenFootball";
import WomenRunning from "./pages/Categories/Women Categories/WomenRunning";
import KidsCategories from "./pages/Categories/Kids Categories/KidsCategories";
import KidsCasual from "./pages/Categories/Kids Categories/KidsCasual";
import KidsFootball from "./pages/Categories/Kids Categories/KidsFootball";
import KidsRunning from "./pages/Categories/Kids Categories/KidsRunning";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import OrderDetails from "./pages/OrderDetails";
function App() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="men" element={<MenCategories />}>
          <Route index element={<MenCasual />} />
          <Route path="football" element={<MenFootball />} />
          <Route path="running" element={<MenRunning />} />
        </Route>
        <Route path="women" element={<WomenCategories />}>
          <Route index element={<WomenCasual />} />
          <Route path="football" element={<WomenFootball />} />
          <Route path="running" element={<WomenRunning />} />
        </Route>
        <Route path="kids" element={<KidsCategories />}>
          <Route index element={<KidsCasual />} />
          <Route path="football" element={<KidsFootball />} />
          <Route path="running" element={<KidsRunning />} />
        </Route>
        <Route path="men/:productId" element={<ProductDetails />} />
        <Route path="women/:productId" element={<ProductDetails />} />
        <Route path="kids/:productId" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orderdetails" element={<OrderDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
