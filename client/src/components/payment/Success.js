import React from "react";
import { Link } from "react-router-dom";
import Alert from "../layout/Alert";

const Success = () => {
  return (
    <section className="section section-auth">
      <div className="container">
        <div className="row mini">
          <div className="col m3"></div>
          <div className="col s12 m6">
            <Link to="/">
              <h4 style={{ textAlign: "center", color: "#162337" }}>
                Task App
              </h4>
            </Link>
          </div>
          <div className="col m3"></div>
        </div>

        <div className="row">
          <div className="col m3"></div>
          <div className="col s12 m6">
            <h5
              className="title"
              style={{
                color: "#07365F",
                fontWeight: "500",
                textAlign: "center",
                verticalAlign: "middle"
              }}
            >
              Order Successfull!
              <br />
              We appreciate your business! If you have any questions, please
              email: &nbsp;
              <a href="mailto:orders@taskapp.com">orders@taskapp.com</a>
            </h5>
          </div>
          <div className="col m3"></div>
        </div>
      </div>
    </section>
  );
};

export default Success;
