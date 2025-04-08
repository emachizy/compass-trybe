import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
// import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Toaster position="top-right" offset={0} className="!py-0" richColors />

      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
