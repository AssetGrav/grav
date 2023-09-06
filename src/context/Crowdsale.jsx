import { createContext, useContext, useState } from "react";
import { useContract, useMetamask, useSigner } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { crowdsaleAddress } from "../constants/constants";

const CrowdsaleStateContext = createContext();

export const CrowdsaleStateContextProvider = ({ children }) => {
  const { contract } = useContract(crowdsaleAddress);

  const [error, setError] = useState(null);

  const signer = useSigner();

  const toWei = (ether) => ethers.utils.parseEther(ether);

  const buyToken = async (amount) => {
    try {
      const wei = toWei(amount);
      const contr = await contract.call("buyTokens", [signer._address], {
        value: wei,
      });
    } catch (error) {
      errorCatcher(error);
    }
  };

  const connect = useMetamask();

  function errorCatcher(error) {
    setError(error.reason);
  }

  return (
    <CrowdsaleStateContext.Provider
      value={{
        tokenContract: contract,
        buyToken,
        connect,
        crowdsaleError: error,
      }}
    >
      {children}
    </CrowdsaleStateContext.Provider>
  );
};

export const useCrowdsaleStateContext = () => useContext(CrowdsaleStateContext);
