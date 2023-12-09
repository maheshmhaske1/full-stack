import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  const location = useLocation();
  return (
    <>
      {/* <Navbar currentPath={location.pathname} /> */}

      <div className="container-fluid">
        <div className="row" id="banner-1"></div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
