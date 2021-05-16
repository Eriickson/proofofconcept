import {ERROR, LOADING, PROFILE,AUTHENTICATED, ROLES, TOKEN,CHECK_SUBSCRIPTION} from './Constants';
import Auth from "../../Auth/Auth";

export const INITIAL_STATE = {
  user: {
    email: localStorage.getItem("email"),
    oid: localStorage.getItem("oid")
  },
  loading: false,
  token: "",
  expiresAt: "",
  error: "",
  isAuthenticated: Auth.isAuthenticated(),
  roles:[],
  loginFaile: false,
  subscription:["suscrito", "noSuscrito"]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE:
      return {...state, user: action.payload};
    case LOADING:
      return {...state, loading: action.payload};
    case TOKEN:
      return {...state, token: action.payload};
    case ERROR:
      return {...state, error:action.payload};
    case AUTHENTICATED:
      return {...state, isAuthenticated:action.payload};
    case ROLES:
      return {...state, roles:action.payload};
    case CHECK_SUBSCRIPTION:
      return {...state, subscription:action.payload};
    default:
      return state;
  }
};
