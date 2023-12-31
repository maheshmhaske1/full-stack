import React from "react";
import Navbar from "../Navbar";
import "./css/Home.css";
import DefaultProducts from "./DefaultProducts";
import DeafultCategories from "./DeafultCategories";

function Home() {
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <DeafultCategories />
        <DefaultProducts />
      </div>
    </>
  );
}

export default Home;
