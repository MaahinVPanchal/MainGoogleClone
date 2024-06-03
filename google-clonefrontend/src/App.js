import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import ImagePage from "./pages/ImagePage";
import NewsPage from "./pages/NewsPage";
import VideoPage from "./pages/VideoPage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/images" element={<ImagePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/videos" element={<VideoPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              <Login onLogin={handleLogin} isAuthenticated={isAuthenticated} />
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
