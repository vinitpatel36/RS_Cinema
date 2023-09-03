import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//for redux strore
import { Provider } from "react-redux";
import store from "./reduxStore/store";

import App from "./App";
import "./css/index.css";
import "./css/Home.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
    </BrowserRouter>
);

// serviceWorker.unregister();
