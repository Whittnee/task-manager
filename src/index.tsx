import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/app";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./services/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
