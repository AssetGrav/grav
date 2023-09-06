import React from "react";
import { useTokenStateContext } from "../../context/MyToken";
import SignInError from "../SignInError";

const DigoProjectFinancing = () => {
  const { tokenBalance } = useTokenStateContext();
  return (
    <>
      {tokenBalance >= 1000 ? (
        <div className="flex justify-center items-center w-full h-screen text-xl">
          <h1 className="flex ">
            Financing of DIGO GRAVITATION-ETHER projects. Section is under
            development
          </h1>
        </div>
      ) : (
        <SignInError />
      )}
    </>
  );
};

export default DigoProjectFinancing;
