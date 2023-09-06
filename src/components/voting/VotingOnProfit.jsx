import React from "react";
import { useTokenStateContext } from "../../context/MyToken";
import SignInError from "../SignInError";

const VotingOnProfit = () => {
  const { tokenBalance } = useTokenStateContext();
  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Voting on profit sharing. Section is under development
          </h1>
        </div>
      ) : (
        <SignInError />
      )}
    </>
  );
};

export default VotingOnProfit;
