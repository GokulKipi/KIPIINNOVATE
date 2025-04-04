import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import MainHomepage from "./components/MainHomepage";
import MyIdeas from "./components/MyIdeas";
import ReviewIdeas from "./components/ReviewIdeas";
import ContactUs from "./components/ContactUs";
import BrowseIdeas from "./components/BrowseIdeas";
import Header from "./components/Header";
import InnovationPage from "./components/InnovationPage";
import FAQ from "./components/FAQ";
import Blogs from "./components/Blogs";
import BlogDetail from './components/BlogDetail';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [initial, setInitial] = useState("");

  const handleLoginSuccess = (profile) => {
    setUserProfile(profile);
    setInitial(profile.name.charAt(0).toUpperCase()); // Set the initial
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserProfile(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        {/* Render Header only if the user is logged in */}
        {isLoggedIn && <Header initial={initial} userProfile={userProfile} />}
        
        <Routes>
          <Route
            path="/mainhomepage"
            element={
              isLoggedIn ? (
                <MainHomepage
                  setIsLoggedIn={setIsLoggedIn}
                  onLogout={handleLogout}
                  userProfile={userProfile}
                />
              ) : (
                <Homepage onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route path="/browse-ideas" element={<BrowseIdeas />} />
          <Route path="/my-ideas" element={<MyIdeas />} />
          <Route path="/review-ideas" element={<ReviewIdeas />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/innovation" element={<InnovationPage />} /> 
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blogs/:blogId" element={<BlogDetail />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
