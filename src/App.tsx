import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "office-ui-fabric-react/dist/css/fabric.css";
import { themes } from "./components/ThemeContext";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainMenu from "./components/MainMenu";
import GlobalStyle from "./components/GlobalStyle";
import Auth from "./Auth/Auth";

import "./App.sass";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { checkSuscriptionsRedux, isAuthenticateRedux, loginRedux } from "./store/auth/actions";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";

const App: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const localTheme = window.localStorage.getItem("theme") || "dark";
  window.localStorage.setItem("theme", localTheme);
  const [theme, setTheme] = useState({
    palette: localTheme === "dark" ? themes.dark : themes.light,
  });
  const menuRef = useRef();
  const [loading, setLoading] = useState(true);
  const isLogin = useSelector((state: RootStateOrAny) => state.auth.isAuthenticated);
  const subscription = useSelector((state: RootStateOrAny) => state.auth.subscription);

  useEffect(() => {
    checkUser();
    console.log("isLogin  useEffect?", isLogin);
  }, []);

  const checkUser = async () => {
    // await axios.get(`${process.env.REACT_APP_SERVER_HOST}/user`, {
    //   withCredentials: true
    // }).then(response => {
    //   if (typeof response.data.oid == "undefined") {
    //       window.location.href = `${process.env.REACT_APP_SERVER_HOST}/login`;
    //       dispatch(isAuthenticateRedux(false))
    //       //setLoading(false)
    //   } else {
    //     dispatch(loginRedux(response.data))
    //     dispatch(isAuthenticateRedux(true))
    //     setLoading(false)
    //     //checkSuscriptions(response.data.oid)
    //   }
    // }).catch((e: any) => {
    //   console.log("error api atenticacion",e)
    //   //setLoading(false)
    // })
    const user: any = Auth.getUserProfile();
    if (user == null) {
      axios
        .get(`${process.env.REACT_APP_SERVER_HOST}/user`, {
          withCredentials: true,
        })
        .then((response) => {
          if (typeof response.data.oid == "undefined") {
            window.location.href = `${process.env.REACT_APP_SERVER_HOST}/login`;
            dispatch(isAuthenticateRedux(false));
          } else {
            Auth.setUserProfile(response.data);
            dispatch(loginRedux(response.data));
            dispatch(isAuthenticateRedux(true));
            setLoading(false);
          }
        })
        .catch(() => {});
    } else {
      console.log(user);
      dispatch(loginRedux(user));
      dispatch(isAuthenticateRedux(true));
      setLoading(false);
    }
  };

  const checkSuscriptions = (oid: any) => {
    dispatch(checkSuscriptionsRedux(oid));
  };

  const toggleTheme = () => {
    window.localStorage.setItem("theme", theme.palette.name === "dark" ? "light" : "dark");
    setTheme({
      palette: window.localStorage.theme === "dark" ? themes.dark : themes.light,
    });
  };
  // subscription.include((item:any)=> console.log(item))
  //if(subscription.include((item:any)=> console.log(item)))

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle theme={theme} />
        <div className="ms-Grid" dir="ltr">
          <Header toggleTheme={toggleTheme} theme={theme} menuRef={menuRef} />
          <div className="ms-Grid-row">
            <div id="main-element" className="ms-Grid-col ms-sm12 ms-xl12">
              {/* {loading ? <div style={{textAlign: 'center', height:"100vh"}}>   <Spinner style={{position: 'absolute', top:'50%'}}  /> </div> :  null}*/}
              <Router>{children}</Router>
            </div>
          </div>
          <Footer />
          <MainMenu theme={theme} ref={menuRef} />
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
