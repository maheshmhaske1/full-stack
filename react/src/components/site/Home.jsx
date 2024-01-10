import React from "react";
import Navbar from "../Navbar";
import "./css/Home.css";
import DefaultProducts from "./DefaultProducts";
import DeafultCategories from "./DeafultCategories";
import Footer from "../Footer";

function Home() {
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <DeafultCategories />
        <DefaultProducts />
        <Footer />
      </div>
    </>
  );
}

export default Home;
