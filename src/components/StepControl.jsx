export default function StepControl({ type, currentStep }) {
  const renderStepControl = () => {
    switch (type) {
      case "topbar":
        return <StepTopbar currentStep={currentStep} />;
      case "leftbar":
        return <StepLeftbar currentStep={currentStep} />;
    }
  };

  return <>{renderStepControl()}</>;
}

function StepTopbar({ currentStep }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={` ${
            step === currentStep
              ? "border-light-blue bg-light-blue xs:bg-cool-gray"
              : "border-white bg-transparent xs:bg-[#333]"
          } flex h-9 w-9 items-center justify-center rounded-full border border-solid`}
          aria-label={`Go to ${step} form`}
        >
          <p
            className={`font-medium ${step === currentStep ? "text-marine-blue" : "text-white"}`}
          >
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}

function StepLeftbar({ currentStep }) {
  console.log(currentStep);
  const steps = ["your info", "select plan", " add-ons", "summary"];
  return (
    <ul className="flex flex-col gap-5">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-3">
          <div
            className={` ${
              index + 1 === currentStep
                ? "border-light-blue bg-light-blue"
                : "border-white bg-transparent text-white"
            } flex h-7 w-7 items-center justify-center rounded-full border border-solid text-sm font-medium`}
          >
            {index + 1}
          </div>
          <div className="uppercase">
            <p className="text-[10px] text-cool-gray">
              step<span className="text-xs">{index + 1}</span>
            </p>
            <p className="text-xs font-medium text-magnolia">{step}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
