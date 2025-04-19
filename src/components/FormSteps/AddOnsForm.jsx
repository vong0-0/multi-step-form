import { useContext, useState } from "react";
import {
  FormDataContext,
  FormDataDispatchContext,
} from "../../contexts/FormDataContext";

const addOns = [
  {
    addOnName: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    addOnName: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    addOnName: "Customizable profile",
    description: "Custom theme on your profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];

export default function AddOnsForm({ currentStep, setCurrentStep }) {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const formData = useContext(FormDataContext);
  const dispatch = useContext(FormDataDispatchContext);
  const plan = formData.plan.billingType;

  function handleToggleAddOn(addOn) {
    const exists = selectedAddOns.find(
      (item) => item.addOnName === addOn.addOnName,
    );
    if (exists) {
      setSelectedAddOns(
        selectedAddOns.filter((item) => item.addOnName !== addOn.addOnName),
      );
    } else {
      setSelectedAddOns([
        ...selectedAddOns,
        {
          addOnName: addOn.addOnName,
          price: plan === "monthly" ? addOn.monthlyPrice : addOn.yearlyPrice,
        },
      ]);
    }
  }

  function handleNextStep() {
    setCurrentStep(currentStep + 1);
    dispatch({
      type: "select_add_ons",
      addOns: selectedAddOns,
    });
  }

  return (
    <>
      <div className="flex h-full flex-col justify-between">
        <ul className="mt-4 flex flex-col gap-3">
          {addOns.map((addOn) => (
            <li key={addOn.addOnName}>
              <label
                className={`checkbox-container block w-full cursor-pointer rounded-lg border border-solid px-4 py-4 transition-colors duration-300 ${
                  selectedAddOns.find(
                    (item) => item.addOnName === addOn.addOnName,
                  )
                    ? "border-purplish-blue bg-light-blue"
                    : "border-light-gray bg-white"
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={
                      !!selectedAddOns.find(
                        (item) => item.addOnName === addOn.addOnName,
                      )
                    }
                    onChange={() => {
                      handleToggleAddOn(addOn);
                    }}
                    aria-label={`Toggle ${addOn.addOnName} add-on`}
                  />
                  <span className="checkbox"></span>
                  <div className="flex w-full items-center justify-between">
                    <div className="pl-3">
                      <h4 className="font-medium">{addOn.addOnName}</h4>
                      <p className="text-xs text-cool-gray">
                        {addOn.description}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-purplish-blue">{`$${plan === "monthly" ? addOn.monthlyPrice + "/mo" : addOn.yearlyPrice + "/yr"}`}</p>
                  </div>
                </div>
              </label>
            </li>
          ))}
        </ul>
        <div className="hidden w-full items-center justify-between sm:flex">
          <button
            className="font-medium text-cool-gray"
            aria-label="Go back previous form"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Go Back
          </button>
          <button
            className="rounded-lg bg-marine-blue px-4 py-2 font-medium text-white"
            aria-label="Go to next form"
            onClick={handleNextStep}
          >
            Next Step
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 flex w-full justify-between bg-white px-3 py-3 sm:hidden">
        <button
          className="font-medium text-cool-gray"
          aria-label="Go back to previous form"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Go Back
        </button>
        <button
          className="rounded-md bg-marine-blue px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-purplish-blue"
          aria-label="Go to next form"
          onClick={handleNextStep}
        >
          Next Step
        </button>
      </div>
    </>
  );
}
