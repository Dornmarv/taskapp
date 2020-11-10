import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_LOADING
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token1"),
  isAuthenticated: null,
  isPayment: false,
  requestID: null,
  loading: true,
  user: null,
  requests: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token1", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: true
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token1");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
