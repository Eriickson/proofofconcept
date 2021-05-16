import axios from 'axios';

const url: string = (process.env.REACT_APP_SERVER_HOST as string);


class Auth {
  constructor() {
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getToken = this.getToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  getUserProfile() {
    return JSON.parse(localStorage.getItem("userprofile") as string);
  }

  setUserProfile(authResponse: any) {
    localStorage.setItem("userprofile", JSON.stringify(authResponse));
  }

  setSession(authResult: any) {
    console.log("authResult" , authResult )
    localStorage.setItem("email", authResult.email);
    localStorage.setItem("oid", authResult.oid);
    //localStorage.setItem("roles", authResult);
  }


  getToken() {
    if (localStorage.getItem('access_token') === null){
      return ""
    }

    return localStorage.getItem('access_token')
  }

  getProfile() {

    let user;
    let apiProfile;

    if(localStorage.getItem("email") && localStorage.getItem("oid") !== 'undefined') {
      user = JSON.parse(localStorage.getItem("profile") as string);
    } else {
      user = {};
    }

    const profile = Object.assign(user, apiProfile);
    return profile || {};
  }

  getRoles() {
    const roles = localStorage.getItem("roles");

    if(roles) {
      return JSON.stringify(roles);
    } else {
      return null;
    }
  }


  logout() {
    // TODO: además de limpiar localstorage, hay que llamar a oauth para cerrar sesión allí también
    localStorage.clear();
  }

  isAuthenticated() {
    if(localStorage.getItem("email") && localStorage.getItem("oid") !== 'undefined') {
      return true;
    } else {
      return false
    }
  }

}

const authClient = new Auth();

export default authClient;
