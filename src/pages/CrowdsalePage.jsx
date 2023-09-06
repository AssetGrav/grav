import React, { useEffect, useState } from "react";
import { CustomButton, FormField, Loader } from "../components";
import { useCrowdsaleStateContext } from "../context/Crowdsale";
import { useTokenStateContext } from "../context/MyToken";
import { toast } from "react-toastify";

const CrowdsalePage = () => {
  const { buyToken } = useCrowdsaleStateContext();
  const { crowdsaleTokenBalance, accountBalance } = useTokenStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const notify = () => toast("ETH balance not enough");
  const [form, setForm] = useState({
    quantity: 0,
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await buyToken(form.quantity);
    setForm({
      quantity: 0,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    accountBalance < form.quantity && notify();
  }, [form.quantity, accountBalance]);

  console.log("error", form.quantity);
  return (
    <div>
      {isLoading && <Loader />}
      <div className="flex justify-center items-center">
        {crowdsaleTokenBalance > 0 ? (
          <div className="my-[150px] bg-[#1c1c24] p-5 rounded-lg">
            <h2 className="flex justify-center">TOKEN-SALE</h2>
            <form
              onSubmit={handleSubmit}
              className="w-full mt-[65px] flex flex-col gap-[30px]"
            >
              <FormField
                labelName="Number of tokens purchased"
                placeholder="Token volume"
                inputType="number"
                value={form.quantity}
                handleChange={(e) => handleFormFieldChange("quantity", e)}
              />
              <div className="flex justify-between">
                token quantity <span>{form.quantity * 12500} GRAV</span>
              </div>
              <CustomButton
                btnType="submit"
                title="Buy token"
                styles="bg-[#1dc071]"
                yes={accountBalance < form.quantity ? true : false}
              />
            </form>
          </div>
        ) : (
          <div className="my-[150px] bg-[#1c1c24] p-5 rounded-lg">
            Token-sale closed
          </div>
        )}
      </div>
    </div>
  );
};

export default CrowdsalePage;
