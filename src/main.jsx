import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App";
import "./index.css";
import { CrowdfundingStateContextProvider } from "./context/Crowdfunding";
import { TokenStateContextProvider } from "./context/MyToken";
import { CrowdsaleStateContextProvider } from "./context/Crowdsale";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider activeChain={ChainId.Goerli}>
    <Router>
      <CrowdfundingStateContextProvider>
        <TokenStateContextProvider>
          <CrowdsaleStateContextProvider>
            <App />
          </CrowdsaleStateContextProvider>
        </TokenStateContextProvider>
      </CrowdfundingStateContextProvider>
    </Router>
  </ThirdwebProvider>
);
