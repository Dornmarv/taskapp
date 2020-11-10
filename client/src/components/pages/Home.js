import React, { Fragment } from "react";
import Navbar from "../../components/layout/Navbar";
import Showcase from "../../components/layout/Showcase";
import Footer from "../../components/layout/Footer";

const Home = () => {
  return (
    <Fragment>
      <div className="main-header">
        <Navbar />
        <Showcase />
      </div>
      <Footer />
    </Fragment>
  );
};

export default Home;
