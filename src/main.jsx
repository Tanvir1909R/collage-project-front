import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import { BrowserRouter } from "react-router-dom";
import GlobalContext from "./context/GlobalContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <GlobalContext>
        <App />
      </GlobalContext>
    </BrowserRouter>

    <Toaster position="top-right" reverseOrder={true} />
  </>
);
