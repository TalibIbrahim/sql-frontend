import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Carousel from "./components/Carousel";
import Navbar from "./components/Navbar";
import RestaurantList from "./components/RestaurantsList";
import RestaurantPage from "./pages/RestaurantPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import UserPage from "./pages/UserPage";

function App() {
  const location = useLocation();
  const showCarousel = location.pathname === "/"; //shows only on the home page

  return (
    <>
      <Navbar />
      {showCarousel && <Carousel />}

      <Routes>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/restaurants/:id" element={<RestaurantPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/users/:id" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;
