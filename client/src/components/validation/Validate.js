import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { validate } from "../../actions/auth";
import Alert from "../layout/Alert";

const Validate = props => {
  const [formData, setFormData] = useState({
    accountnos: "",
    sortcode: ""
  });

  const { accountnos, sortcode } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    props.validate(accountnos, sortcode);
  };

  if (props.loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <div class="preloader-wrapper big active">
          <div
            class="spinner-layer spinner-blue"
            style={{ borderColor: "#0C5EA6" }}
          >
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
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
                  fontWeight: "500",
                  textAlign: "center"
                }}
              >
                Validate UK Account
              </h5>
            </div>
            <div className="col m3"></div>
          </div>

          <div className="row main">
            <div className="col m3"></div>
            <div className="col s12 m6">
              <div className="card">
                <div className="card-content">
                  <Alert />
                  <div className="row">
                    <form className="col s12" onSubmit={onSubmit}>
                      <div className="row">
                        <div
                          className="input-field col s12 m12"
                          style={{ borderBottom: "none" }}
                        >
                          <input
                            type="text"
                            placeholder="Account Number"
                            className="input-text"
                            name="accountnos"
                            value={accountnos}
                            onChange={onChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div
                          className="input-field col s12 m12"
                          style={{ borderBottom: "none" }}
                        >
                          <input
                            type="text"
                            placeholder="Sort Code"
                            className="input-text"
                            name="sortcode"
                            value={sortcode}
                            onChange={onChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col s6 m8"></div>
                        <div className="col s6 m4">
                          <input
                            style={{
                              backgroundColor: "#eb9011",
                              color: "white",
                              fontWeight: "bold"
                            }}
                            className="btn waves-effect waves-light right"
                            type="submit"
                            value="Validate"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col m3"></div>
          </div>
        </div>
      </section>
    );
  }
};

Validate.propTypes = {
  validate: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.auth.loading
});

export default connect(mapStateToProps, { validate })(Validate);
