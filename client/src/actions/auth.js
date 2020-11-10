import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_LOADING
} from "./types";
import setAuthToken from "../utils/setAuthToken";
axios.defaults.baseURL = "http://localhost:5000";
//Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token1) {
    setAuthToken(localStorage.token1);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
export const setLoading = () => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
  } catch (err) {
    console.log(err);
  }
};

// Register uesr
export const register = ({
  fullName,
  email,
  phone,
  address,
  password
}) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({
    fullName,
    email,
    phone,
    address,
    password
  });

  try {
    dispatch(setLoading());
    const res = await axios.post("/api/users/register", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    dispatch(setLoading());
    const res = await axios.post("/api/auth/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err);
    /* dispatch(setAlert(err.message, "danger")); */
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//LOGOUT / CLEAR PROFILE
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
