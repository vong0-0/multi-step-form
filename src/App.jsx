import { useState } from "react";
import StepControl from "./components/StepControl";
import FormSteps from "./components/FormSteps/FormSteps";
import { FormDataContextProvider } from "./contexts/FormDataContext";

export default function App() {
  return <MultiStepForm />;
}

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <main className="xs:bg-desktop min-h-screen w-full items-center justify-center bg-mobile bg-no-repeat pt-20 sm:flex sm:pt-0">
      <FormDataContextProvider>
        <div className="relative mx-auto w-11/12 max-w-[375px] pb-20 xs:max-w-[450px] sm:max-w-[800px] sm:p-0">
          <div className="absolute -top-[60px] left-0 w-full sm:hidden">
            <StepControl type={"topbar"} currentStep={currentStep} />
          </div>
          <div className="flex rounded-lg bg-white px-6 py-6 sm:h-[480px] sm:px-3 sm:py-3">
            <div className="hidden shrink-0 grow-0 basis-[30%] rounded-lg border border-solid border-red-50 bg-sidebar-desktop bg-[40%_100%] px-6 py-6 sm:block">
              <StepControl type="leftbar" currentStep={currentStep} />
            </div>
            <div className="h-full w-full sm:pt-6">
              <div className="mx-auto h-full sm:w-10/12 md:w-3/4">
                <FormSteps
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              </div>
            </div>
          </div>
        </div>
      </FormDataContextProvider>
    </main>
  );
}
