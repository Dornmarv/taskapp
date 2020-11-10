import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../../components/layout/Alert";

const Register = props => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    password2: ""
  });

  const { fullName, email, phone, address, password, password2 } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      props.setAlert("Passwords do not match", "danger");
    } else {
      props.register({ fullName, email, phone, address, password });
    }
  };

  //Redirect if Authenticated and loading is false
  if (props.isAuthenticated && !props.loading) {
    return <Redirect to="/order" />;
  }

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
              <Link
                to="/"
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "rgb(255, 39, 106)"
                }}
              >
                {" "}
                <h4 style={{ color: "#162337" }}>Task App</h4>
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
                Register
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
                    <form class="col s12" onSubmit={e => onSubmit(e)}>
                      <div className="row">
                        <div className="input-field col s12 m12">
                          <input
                            type="text"
                            placeholder="Full name"
                            className=" input-text"
                            name="fullName"
                            value={fullName}
                            onChange={e => onChange(e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div
                          className="input-field col s12 m12"
                          style={{ borderBottom: "none" }}
                        >
                          <input
                            type="email"
                            placeholder="Email Address"
                            className=" input-text"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s12 m12">
                          <input
                            type="text"
                            placeholder="Phone number"
                            className=" input-text"
                            name="phone"
                            value={phone}
                            onChange={e => onChange(e)}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-field col s12 m6">
                          <input
                            type="password"
                            placeholder="Password"
                            className=" input-text"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                          />
                        </div>
                        <div className="input-field col s12 m6">
                          <input
                            type="password"
                            placeholder="Confirm password"
                            className=" input-text"
                            name="password2"
                            value={password2}
                            onChange={e => onChange(e)}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-field col s12 m12">
                          <input
                            type="text"
                            placeholder="Address"
                            className="input-text"
                            name="address"
                            value={address}
                            onChange={e => onChange(e)}
                          />
                        </div>
                      </div>

                      <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col s6 m6">
                          <p style={{ fontWeight: "500" }}>
                            Already have an account?{" "}
                            <Link
                              to="/login"
                              style={{
                                fontWeight: "bold",
                                textDecoration: "underline"
                              }}
                            >
                              {" "}
                              Log in
                            </Link>{" "}
                          </p>
                        </div>
                        <div className="col s6 m6">
                          <button
                            style={{
                              backgroundColor: "#eb9011",
                              color: "white",
                              fontWeight: "bold"
                            }}
                            className="btn waves-effect waves-light right"
                            type="submit"
                          >
                            Sign up
                          </button>
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { setAlert, register })(Register);
