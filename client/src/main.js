import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { BrowserRouter as BrowserRoute } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
import "./index.css";
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#87493d", // Your desired background color
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRoute>
      <ChakraProvider theme={theme}>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ChakraProvider>
    </BrowserRoute>
  </React.StrictMode>
);
