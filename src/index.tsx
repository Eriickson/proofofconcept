import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from "react-intl";
import English from './translations/en.json';
import Spanish from './translations/es.json';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";
import Rutas from './rutas/Rutas';


ReactDOM.render(
    <Provider store={store}>
        <Rutas>
          <IntlProvider locale='es' messages={Spanish}>

          </IntlProvider>
        </Rutas>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
