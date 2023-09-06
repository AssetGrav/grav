import React from "react";
import { useTokenStateContext } from "../../context/MyToken";
import SignInError from "../SignInError";

const Bitcoin = () => {
  const { tokenBalance } = useTokenStateContext();
  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Bitcoin blockchain analysis. The entire blockchain is analyzed on
            algorithms for the presence of accounts and movements of funds. Will
            be available later.
          </h1>
        </div>
      ) : (
        <SignInError />
      )}
    </>
  );
};

export default Bitcoin;
