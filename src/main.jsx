import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import GlobalContext from "./context/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalContext>
      <App />
    </GlobalContext>
  </BrowserRouter>
);
