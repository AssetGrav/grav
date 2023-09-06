import React, { useEffect, useState } from "react";
import { useCrowdfundingStateContext } from "../context/Crowdfunding";
import DisplayCampaigns from "../components/DisplayCampaigns";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useCrowdfundingStateContext();

  const newDate = new Date();

  const filteredCampaigns = (data) => {
    const newCampaignsList = data.filter((elem) => {
      return Number(elem.deadline) > newDate.getTime() && elem;
    });
    return newCampaignsList;
  };

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(filteredCampaigns(data));
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <div>
      {
        <DisplayCampaigns
          title="Projects proposed for review"
          isLoading={isLoading}
          campaigns={campaigns}
        />
      }{" "}
      <div className="my-[30px]">
        Proposed projects are considered on a first-come, first-served basis if
        the project receives 100 votes, it goes to the analytical section
        immediately.
      </div>
    </div>
  );
};

export default Home;
