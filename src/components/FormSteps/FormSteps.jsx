import PersonalInfoFields from "./PersonalInfoFields";
import PlanOptions from "./PlanOptions";
import AddOnsForm from "./AddOnsForm";
import Summary from "./Summary";

const formStepDetails = [
  {
    title: "Personal info",
    description: "Please provide your name, email address, and phone number.",
  },
  {
    title: "Select your plan",
    description: "Your have the option of monthly or yearly billing.",
  },
  {
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
  },
  {
    title: "Finishing up",
    description: "Double-check everthing looks OK before confirming.",
  },
];

export default function FormSteps({ currentStep, setCurrentStep }) {
  const formStepDetail = formStepDetails[currentStep - 1];

  const formComponents = {
    1: (
      <PersonalInfoFields
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    ),
    2: (
      <PlanOptions currentStep={currentStep} setCurrentStep={setCurrentStep} />
    ),
    3: <AddOnsForm currentStep={currentStep} setCurrentStep={setCurrentStep} />,
    4: <Summary currentStep={currentStep} setCurrentStep={setCurrentStep} />,
  };

  const renderForm = () => formComponents[currentStep] || null;

  return (
    <>
      {currentStep >= 5 ? (
        <div className="flex h-[300px] flex-col items-center justify-center">
          <img
            className="mb-4 h-16 w-16"
            src="images/icon-thank-you.svg"
            alt=""
          />
          <h2 className="mb-2 text-2xl font-bold text-marine-blue">
            Thank you!
          </h2>
          <p className="text-center text-cool-gray">
            Thanks for confirming your subcription! <br /> We hope you have fun
            using our platform. If you ever need support plaese feel free to
            email use at support@loremgaming.com.
          </p>
        </div>
      ) : (
        <div className="flex h-full flex-col gap-2">
          <h2 className="text-2xl font-bold">{formStepDetail.title}</h2>
          <p className="text-cool-gray">{formStepDetail.description}</p>
          {renderForm()}
        </div>
      )}
    </>
  );
}
