
function App() {
  // const location = useLocation();
  // const hideNavbar =
  //   location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="container mx-auto">
      <Navbar />

      <div className="main">
        <Routes>
          {/* User Routes */}
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
          <Route path="men/:productId" element={<ProductDetails />} />
          <Route path="women/:productId" element={<ProductDetails />} />
          <Route path="kids/:productId" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orderdetails" element={<OrderDetails />} />
          <Route path="*" element={<NotFound />} />
          {/* admin routes */}
          <Route path="admin" element={<DashboardHome />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
