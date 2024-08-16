// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import PlaygroundProvider from "./PlaygroundContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <PlaygroundProvider>
    <App />
  </PlaygroundProvider>
  // </StrictMode>,
);
