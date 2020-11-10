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
/* axios.defaults.baseURL = "http://localhost:5000"; */
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

// Validate Account
export const validate = (accountnos, sortcode) => async dispatch => {
  try {
    /*   dispatch(setLoading()); */
    const res = await axios.get(
      `https://api.addressy.com/BankAccountValidation/Interactive/Validate/v2.00/json3.ws?Key=BK57-GM99-GR46-RU36&AccountNumber=${accountnos}&SortCode=${sortcode}`
    );
    /*   dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }); */
    console.log(res.data.Items);
    if (res.data.Items[0].IsCorrect === true) {
      dispatch(setAlert("Account number is valid", "success"));
    } else if (res.data.Items[0].IsCorrect === false) {
      dispatch(setAlert("Invalid Account number or sort code", "danger"));
    } else if (res.data.Items[0].Error === "1002") {
      dispatch(setAlert("Invalid Sortcode parameter", "danger"));
    } else if (res.data.Items[0].Error === "1004") {
      dispatch(setAlert("Invalid Account number parameter", "danger"));
    }
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};

//LOGOUT / CLEAR PROFILE
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
