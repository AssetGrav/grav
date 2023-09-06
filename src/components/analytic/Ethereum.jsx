import React from "react";
import { useTokenStateContext } from "../../context/MyToken";
import SignInError from "../SignInError";

const Ethereum = () => {
  const { tokenBalance } = useTokenStateContext();
  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Ethereum blockchain analysis. The entire blockchain is analyzed on
            algorithms for the presence of accounts and movements of funds.
            Explore new contracts and use in GA projects. Consolidation and
            project support. Will be available later.
          </h1>
        </div>
      ) : (
        <SignInError />
      )}
    </>
  );
};

export default Ethereum;
