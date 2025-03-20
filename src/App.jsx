import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home"; // Import Home page

function App() {
  return (
    <div className="App"> {/* ✅ Wrap in a container for consistent styling */}
      <Home />
    </div>
  );
}

export default App;
