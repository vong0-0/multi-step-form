import { useContext } from "react";
import { FormDataContext } from "../../contexts/FormDataContext";

export default function Summary({ currentStep, setCurrentStep }) {
  const formData = useContext(FormDataContext);

  function handleNextStep() {
    setCurrentStep(currentStep + 1);
  }

  return (
    <>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="rounded-lg bg-magnolia px-3 py-4">
            <div className="mb-2 flex items-center justify-between border-b border-solid border-light-gray pb-4">
              <div>
                <p className="font-medium capitalize text-marine-blue">
                  {formData.plan.name} ({formData.plan.billingType})
                </p>
                <a className="cursor-pointer font-medium text-cool-gray underline">
                  Change
                </a>
              </div>
              <p className="font-bold">
                ${formData.plan.price}/
                {formData.plan.billingType === "monthly" ? "mo" : "yr"}
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {formData.addOns.map((addOn) => (
                <li
                  key={addOn.addOnName}
                  className="flex w-full justify-between"
                >
                  <p className="text-cool-gray">{addOn.addOnName}</p>
                  <p className="text-marine-blue">
                    +${addOn.price}/
                    {formData.plan.billingType === "monthly" ? "mo" : "yr"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between pl-3">
            <p className="text-cool-gray">
              Total{" "}
              {`(per ${formData.plan.billingType === "monthly" ? "month" : "year"})`}
            </p>
            <p className="text-lg font-bold text-purplish-blue">
              +$
              {formData.plan.price +
                formData.addOns.reduce((total, item) => total + item.price, 0)}
              /{formData.plan.billingType === "monthly" ? "mo" : "yr"}
            </p>
          </div>
        </div>
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
            Confirm
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 flex w-full justify-between bg-white px-3 py-3 xs:hidden">
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
          Confirm
        </button>
      </div>
    </>
  );
}
