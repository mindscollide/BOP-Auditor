import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import App from "./App.jsx";
import { NotificationProvider } from "./context/NotificationProvider.jsx";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </Provider>
);
