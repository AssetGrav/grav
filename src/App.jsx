import React from "react";
import { Route, Routes } from "react-router-dom";

import {
  Sidebar,
  Navbar,
  ProjectAnalysis,
  Bitcoin,
  AccountControl,
  Ethereum,
  StockAnalysis,
  DefiAnalysis,
  IndustryDiagnostic,
  Statistic,
  Technologies,
  VotingOnProfit,
  DigoTwenty,
  GasSpaceFinancing,
  DigoProjectFinancing,
} from "./components";
import {
  CampaignDetails,
  CreateCampaign,
  Home,
  Profile,
  Voting,
} from "./pages";
import CrowdsalePage from "./pages/CrowdsalePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Withdraw from "./components/Withdraw";
import Funded from "./components/Funded";
import Reports from "./components/Reports";
import { Layout } from "./layout";

const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row text-white pt-[30px]">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-campaign" element={<CreateCampaign />} />
          <Route path="campaign-details/:id" element={<CampaignDetails />} />
          <Route path="voting/" element={<Layout />}>
            <Route index element={<Voting />} />
            <Route path="profit-voting/" element={<VotingOnProfit />} />
            <Route path="twenty-projects/" element={<DigoTwenty />} />
            <Route path="gas-space-projects/" element={<GasSpaceFinancing />} />
            <Route path="digo-projects" element={<DigoProjectFinancing />} />
          </Route>
          <Route path="token-sale" element={<CrowdsalePage />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="fund" element={<Funded />} />
          <Route path="reports/" element={<Layout />}>
            <Route index element={<Reports />} />
            <Route path="project-analysis/" element={<ProjectAnalysis />} />
            <Route path="bitcoin-analysis/" element={<Bitcoin />} />
            <Route path="ethereum-analysis/" element={<Ethereum />} />
            <Route path="account-control/" element={<AccountControl />} />
            <Route path="stock-analysis/" element={<StockAnalysis />} />
            <Route path="defi-analysis/" element={<DefiAnalysis />} />
            <Route
              path="industry-diagnostic/"
              element={<IndustryDiagnostic />}
            />
            <Route path="statistic/" element={<Statistic />} />
            <Route path="technologies/" element={<Technologies />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
