import React, { useEffect } from "react";
import WOW from "wow.js";
import { Link } from "react-router-dom";

const Showcase = () => {
  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);
  return (
    <div>
      <div className="showcase container">
        <div className="row">
          <div className="col m3"></div>
          <div className="col s12 m6 wow fadeIn" data-wow-duration="2s">
            <h5
              style={{
                fontSize: "40px",
                fontWeight: "700",
                lineHeight: "55px"
              }}
            >
              Purchase the One book <br />
              you need
            </h5>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "400"
              }}
            >
              We provide competent book to indviduals, organizations
            </p>
            <br />
            <Link
              to="/order"
              style={{
                color: "#fff",
                backgroundColor: "#eb9011",
                height: "54px",
                width: "145px",
                lineHeight: "54px",
                fontSize: "15px",
                fontWeight: "bold",
                padding: "0px 10px",
                boxShadow: "none"
              }}
              className="btn btn-large waves-effect waves-light"
            >
              Order now
            </Link>{" "}
          </div>
          <div className="col m3"></div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
