import React, { useEffect, useState } from "react";
import { useCrowdfundingStateContext } from "../context/Crowdfunding";
import DisplayCampaigns from "../components/DisplayCampaigns";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useCrowdfundingStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  console.log("profcamp", campaigns);

  return (
    <DisplayCampaigns
      title="All projects you recommend"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
