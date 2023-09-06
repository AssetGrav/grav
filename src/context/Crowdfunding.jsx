import { createContext, useContext, useState } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { crowdfundingAddress } from "../constants/constants";

const CrowdfundingStateContext = createContext();

export const CrowdfundingStateContextProvider = ({ children }) => {
  // crowdfunding contract
  const { contract } = useContract(crowdfundingAddress);

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const { mutateAsync: setVoting } = useContractWrite(contract, "setVoting");
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState();
  const [projectNames, setProjectNames] = useState([]);

  const address = useAddress();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          form.title.trim(), //title
          form.tokenUrl.trim(),
          form.description.trim(), // description
          form.target.toString().trim(),
          new Date(form.deadline).getTime(), //deadline
          form.image,
          form.invited.trim(),
        ],
      });
      console.log("contract call success", data);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getCampaigns = async () => {
    try {
      const campaigns = await contract.call("getCampaigns");

      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        tokenUrl: campaign.url,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toString(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        invited: campaign.invited,
        pId: i,
      }));
      return parsedCampaigns;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getNameOfProject = async () => {
    const parsedCampaigns = await getCampaigns();
    console.log("parse", parsedCampaigns);
    if (Array.isArray(parsedCampaigns) === true) {
      const names = parsedCampaigns.map((elem) => {
        return elem.title;
      });
      setProjectNames(names);
    }
  };

  const getUserCampaigns = async () => {
    try {
      const allCampaigns = await getCampaigns();

      const filteredCampaigns = allCampaigns.filter(
        (campaign) => campaign.owner === address
      );
      return filteredCampaigns;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const donate = async (pId) => {
    try {
      const donate = await contract.call("donateToCampaign", [pId]);
      return donate;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getDonations = async (pId) => {
    try {
      const donations = await contract.call("getDonators", [pId]);
      const numberOfDonations = donations[0].length;

      const parsedDonations = [];

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i]).toString(),
        });
      }
      return parsedDonations;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const setVotingPermission = async (_id) => {
    try {
      await setVoting({ args: [_id] });
    } catch (error) {
      errorCatcher(error);
    }
  };

  const getVotingPermission = async (_id) => {
    try {
      const data = await contract.call("getVoting", [_id]);
      setPermission(data);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const connect = useMetamask();

  function errorCatcher(error) {
    setError(error.reason);
  }

  return (
    <CrowdfundingStateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        crowdfundingError: error,
        setVotingPermission,
        getVotingPermission,
        permission,
        getNameOfProject,
        projectNames,
      }}
    >
      {children}
    </CrowdfundingStateContext.Provider>
  );
};

export const useCrowdfundingStateContext = () =>
  useContext(CrowdfundingStateContext);
