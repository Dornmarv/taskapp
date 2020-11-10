import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Alert from "../../components/layout/Alert";

const Login = props => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    props.login(email, password);
  };

  //Redirect if logged in and loading is false
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
                Log In
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
                            type="email"
                            placeholder="Email Address"
                            className=" input-text"
                            name="email"
                            value={email}
                            onChange={onChange}
                            autocomplete="none"
                            required
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="input-field col s12 m12">
                          <input
                            type="password"
                            placeholder="Password"
                            className=" input-text"
                            name="password"
                            value={password}
                            minLength="6"
                            onChange={onChange}
                            autocomplete="none"
                            required
                          />
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "20px" }}>
                        <div className="col s6 m8">
                          <p style={{ fontWeight: "500" }}>
                            Dont have an account yet?{" "}
                            <Link
                              to="/register"
                              style={{
                                fontWeight: "bold",
                                textDecoration: "underline"
                              }}
                            >
                              {" "}
                              Create an account
                            </Link>{" "}
                          </p>
                        </div>
                        <div className="col s6 m4">
                          <input
                            style={{
                              backgroundColor: "#eb9011",
                              color: "white",
                              fontWeight: "bold"
                            }}
                            className="btn waves-effect waves-light right"
                            type="submit"
                            value="Sign in"
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps, { login })(Login);
