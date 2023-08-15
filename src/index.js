import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.bundle.js";
import 'animate.css'
import 'wowjs'
import './scss/index.scss'
import store from "./store";
import { Provider } from "react-redux";
//Cấu hình realtime (websocket với)

// export const connection = new signalR.HubConnectionBuilder().withUrl(`https://movienew.cybersoft.edu.vn/api/chatHub`).configureLogging(signalR.LogLevel.Information).build();

// connection.start().then(() => {

// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
// .catch((error)=>{
//   console.log(error);
// })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
