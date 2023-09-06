import React from "react";
import { Link } from "react-router-dom";

const SignInError = () => {
  return (
    <div className="bg-[#1c1c24] flex justify-center h-screen items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <Link to={"/token-sale"} className="text-yellow-300 mr-[5px]">
          {"Buy 1000 GRAV"}
        </Link>
        to sign in to the page.
      </div>
    </div>
  );
};

export default SignInError;
