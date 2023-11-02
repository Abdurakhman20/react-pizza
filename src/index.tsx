import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  );
}
