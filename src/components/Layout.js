import React, {useEffect, useRef, useState} from 'react';
import { useHistory, useLocation} from "react-router-dom";

import {themes} from "./ThemeContext";
import {ThemeProvider} from "@fluentui/react-theme-provider";
import GlobalStyle from "./GlobalStyle";
import MainMenu from "./MainMenu";
import Header from "./Header";
import Footer from "./Footer";


function LayoutRoute(props) {

    const history = useHistory();
    const localTheme = window.localStorage.getItem('theme') || 'dark';
    window.localStorage.setItem('theme', localTheme);
    const [theme, setTheme] = useState({palette: localTheme === 'dark' ? themes.dark : themes.light});
    const menuRef = useRef();

    useEffect(()=>{

    },[])

    const toggleTheme = () => {
        window.localStorage.setItem('theme', theme.palette.name === "dark" ? 'light' : 'dark');
        setTheme({ palette:
                window.localStorage.theme === "dark"
                    ? themes.dark
                    : themes.light
        })
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle theme={theme} />
                <div className="ms-Grid" dir="ltr">
                    <Header
                        toggleTheme={toggleTheme}
                        theme={theme}
                        menuRef={menuRef}
                    />
                    <div className="ms-Grid-row">
                        <div id="main-element" className="ms-Grid-col ms-sm12 ms-xl12">
                            {props.children}
                        </div>
                    </div>
                    <Footer />
                    <MainMenu theme={theme} ref={menuRef}/>
                </div>
            </ThemeProvider>
        </>
    )
}

export default LayoutRoute;