import "./App.css";
import Carousel from "./components/Carousel";
import Navbar from "./components/Navbar";
import RestaurantList from "./components/RestaurantsList";

function App() {
  return (
    <>
      <Navbar />
      <Carousel />
      <RestaurantList />
    </>
  );
}

export default App;
