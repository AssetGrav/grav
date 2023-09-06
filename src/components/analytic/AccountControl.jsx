import React from "react";
import { useTokenStateContext } from "../../context/MyToken";
import SignInError from "../SignInError";

const AccountControl = () => {
  const { tokenBalance } = useTokenStateContext();

  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Tracking Large Accounts. Information on large accounts and
            transactions within the network. Will be available later.
          </h1>
        </div>
      ) : (
        <SignInError />
      )}
    </>
  );
};

export default AccountControl;
