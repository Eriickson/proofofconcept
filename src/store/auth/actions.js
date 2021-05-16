import {LOADING, PROFILE, AUTHENTICATED, ROLES, LOGINFAILE, CHECK_SUBSCRIPTION} from './Constants';
import Auth from "../../Auth/Auth";
import axios from "axios";


export const loginRedux = (respuesta) => async (dispatch) => {
    console.log("loginRedux logs",respuesta )
    Auth.setSession(respuesta)
    dispatch({
        type: PROFILE,
        payload: respuesta
    });
}

export const checkSuscriptionsRedux = (oid) => async (dispatch) => {

    await axios.get(`${process.env.REACT_APP_SERVER_HOST}/api/getuser/${oid}/subscription`)
        .then(response => {
        dispatch({
            type: CHECK_SUBSCRIPTION,
            payload: response.data
        })
    }).catch((e) => {
        console.log("error api atenticacion",e)
    })


}

export const restorePasswordRedux = (email) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    });

}


export const resetProfileRedux = () => async (dispatch) => {

    localStorage.removeItem("access_token");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("profile");
    localStorage.removeItem("roles");

    dispatch({
        type: PROFILE,
        payload: []
    });
    dispatch({
        type: AUTHENTICATED,
        payload: false
    });
    dispatch({
        type: ROLES,
        payload: []
    });

}

export const loginReduxError = () => async (dispatch) => {

    dispatch({
        type: LOGINFAILE,
        payload: true
    });
}

export const isAuthenticateRedux = (value) => async (dispatch) => {

    dispatch({
        type: AUTHENTICATED,
        payload: value
    });
}


