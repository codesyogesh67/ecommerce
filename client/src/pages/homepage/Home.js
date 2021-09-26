import React from "react";

import "../../App.css";

import Banner from "./components/banner/Banner";
import CategoryList from "./components/category/CategoryList";
import Footer from "../../components/footer/Footer";

function Home() {
  return (
    <>
      <Banner />
      <CategoryList />
      <Footer />
    </>
  );
}

export default Home;
