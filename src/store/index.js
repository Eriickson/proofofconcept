import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./auth/reducer";
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // this is for debugging with React-Native-Debugger, you may leave it out

const reducers = combineReducers({
    auth: authReducer,
});

export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);