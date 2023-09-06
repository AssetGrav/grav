import { createContext, useContext, useEffect, useState } from "react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { crowdsaleAddress, tokenMTAddress } from "../constants/constants";
import { useBalance } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";

const TokenStateContext = createContext();

export const TokenStateContextProvider = ({ children }) => {
  // token contract
  const { contract } = useContract(tokenMTAddress);
  const address = useAddress();
  const { data } = useTokenBalance(contract, address);

  // crowdsale token volume
  const { data: datasale } = useTokenBalance(contract, crowdsaleAddress);

  const [tokenBalance, setTokenBalance] = useState();
  const [crowdsaleTokenBalance, setCrowdsaleTokenBalance] = useState();

  const [error, setError] = useState(null);

  const { data: accountBalance, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);

  const setTokenInfo = () => {
    setTokenBalance(Number(data?.displayValue));
  };

  const checkCrowdsaleBalance = () => {
    setCrowdsaleTokenBalance(Number(datasale?.displayValue));
  };

  const sendToken = async (beneficiary, amount) => {
    try {
      const send = await contract.call("transfer", [beneficiary, amount]);
      return send;
    } catch (error) {
      errorCatcher(error);
    }
  };

  useEffect(() => {
    checkCrowdsaleBalance();
  }, [datasale?.displayValue]);

  useEffect(() => {
    setTokenInfo();
  }, [data?.displayValue]);

  function errorCatcher(error) {
    setError(error.reason);
  }

  return (
    <TokenStateContext.Provider
      value={{
        tokenContract: contract,
        tokenBalance,
        setTokenInfo,
        checkCrowdsaleBalance,
        crowdsaleTokenBalance,
        sendToken,
        tokenError: error,
        accountBalance: accountBalance?.displayValue,
      }}
    >
      {children}
    </TokenStateContext.Provider>
  );
};

export const useTokenStateContext = () => useContext(TokenStateContext);
