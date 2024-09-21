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
import Categorie from "./pages/Categorie";
import AllItems from "./pages/AllItems";
import CategorieDetails from "./pages/CategorieDetails";
import ItemDisplay from "./pages/ItemDisplay";
function App() {
  return (
    <div className="container mx-auto">
      <Navbar />

      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
          <Route path="categorie/:categorieGender" element={<Categorie />}>
            <Route path=":categrieType" element={<CategorieDetails />}>
              <Route index element={<ItemDisplay />} />
            </Route>
          </Route>
          <Route path="all" element={<AllItems />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
