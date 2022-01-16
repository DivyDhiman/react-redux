import { render } from "react-dom";
import {  BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./redux/store/index";
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
  <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>,
  rootElement
);

reportWebVitals();
