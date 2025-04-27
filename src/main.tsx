import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const rootElem = document.getElementById("root")

if (rootElem) {
    const root = createRoot(rootElem)

    root.render(
        <Provider store={store}>
            <StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </StrictMode>
        </Provider>
    );
}
