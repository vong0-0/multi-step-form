import { useContext, useState } from "react";
import { FormDataDispatchContext } from "../../contexts/FormDataContext";

const plans = [
  {
    planId: Math.random().toString().substring(2, 8),
    name: "arcade",
    monthlyPrice: 9,
    yearlyPrice: 90,
    icon: "icon-arcade.svg",
  },
  {
    planId: Math.random().toString().substring(2, 8),
    name: "advanced",
    monthlyPrice: 12,
    yearlyPrice: 120,
    icon: "icon-advanced.svg",
  },
  {
    planId: Math.random().toString().substring(2, 8),
    name: "pro",
    monthlyPrice: 15,
    yearlyPrice: 150,
    icon: "icon-pro.svg",
  },
];

export default function PlanOptions({ currentStep, setCurrentStep }) {
  const dispatch = useContext(FormDataDispatchContext);
  const [selectedPlan, setSelectedPlan] = useState({
    name: "arcade",
    price: 9,
    billingType: "monthly",
  });

  function handleSelectPlan(planName) {
    const plan = plans.find((plan) => plan.name === planName);
    const price =
      selectedPlan.billingType === "monthly"
        ? plan.monthlyPrice
        : plan.yearlyPrice;

    setSelectedPlan({
      ...selectedPlan,
      name: plan.name,
      price: price,
    });
  }

  function handleToggleBillingType() {
    setSelectedPlan({
      ...selectedPlan,
      billingType:
        selectedPlan.billingType === "monthly" ? "yearly" : "monthly",
    });
  }

  function handleNextStep() {
    dispatch({
      type: "select_plan",
      name: selectedPlan.name,
      price: selectedPlan.price,
      billingType: selectedPlan.billingType,
    });
    setCurrentStep(currentStep + 1);
  }

  return (
    <>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-8">
          <ul className="mt-4 flex flex-col gap-3 sm:flex-row">
            {plans.map((plan) => (
              <li
                key={plan.name}
                className={`flex-1 border border-solid ${selectedPlan.name === plan.name ? "border-purplish-blue bg-magnolia" : "border-light-gray bg-white"} rounded-lg`}
              >
                <button
                  className={`flex w-full items-start gap-4 px-3 py-3 sm:flex-col sm:gap-9`}
                  aria-label={`${plan.name} plan, $${plan.monthlyPrice} per ${selectedPlan.billingType === "monthly" ? "month" : "year"}`}
                  onClick={() => handleSelectPlan(plan.name)}
                >
                  <img src={`images/${plan.icon}`} alt="" />
                  <div className="flex flex-col items-start">
                    <h4 className="text-base font-medium text-marine-blue">
                      {plan.name}
                    </h4>
                    <p className="text-sm font-medium text-cool-gray">{`$${selectedPlan.billingType === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}/${selectedPlan.billingType === "monthly" ? "mo" : "yr"}`}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-6">
            <span className="font-medium">Monthly</span>
            <button
              className="w-11 rounded-full bg-marine-blue px-1 py-1"
              aria-label={`Toggle to ${selectedPlan.billingType === "monthly" ? "yearly" : "monthly"}`}
              onClick={handleToggleBillingType}
            >
              <div
                className={`relative ${selectedPlan.billingType === "monthly" ? "left-0 translate-x-0" : "left-full -translate-x-full"} h-3 w-3 rounded-full bg-white transition-all duration-300`}
              ></div>
            </button>
            <span className="font-medium">Yearly</span>
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
