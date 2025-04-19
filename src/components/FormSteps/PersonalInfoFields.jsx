import { useState, useContext } from "react";
import {
  FormDataContext,
  FormDataDispatchContext,
} from "../../contexts/FormDataContext";

export default function PersonalInfoFields({ currentStep, setCurrentStep }) {
  const [error, setError] = useState();
  const formData = useContext(FormDataContext);
  const dispatch = useContext(FormDataDispatchContext);

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({
      type: "change",
      name: name,
      value: value,
    });
  }

  function handleNextStep() {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0\d{9}$/;

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email Address is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    else if (!phoneRegex.test(formData.phoneNumber))
      newErrors.phoneNumber = "Invalid phone number format";

    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setError(newErrors);
  }

  return (
    <>
      <div className="flex h-full w-full flex-col items-start justify-between">
        <div className="mt-4 flex w-full flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              {error?.name && (
                <p className="text-[11px] font-medium text-strawberry-red xs:text-sm">
                  {error.name}
                </p>
              )}
            </div>
            <input
              id="name"
              className="rounded-md border border-solid border-cool-gray px-4 py-2 focus-visible:outline-purplish-blue"
              type="text"
              name="name"
              value={formData.name}
              placeholder="e.g. Stephen King"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between">
              <label htmlFor="email" className="text-sm font-medium">
                Emaill Address
              </label>
              {error?.email && (
                <p className="text-[11px] font-medium text-strawberry-red xs:text-sm">
                  {error.email}
                </p>
              )}
            </div>
            <input
              id="email"
              className="rounded-md border border-solid border-cool-gray px-4 py-2 focus-visible:outline-purplish-blue"
              type="email"
              name="email"
              value={formData.email}
              placeholder="e.g. stephenking@lorem.com"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between">
              <label htmlFor="phone-number" className="text-sm font-medium">
                Phone Number
              </label>
              {error?.phoneNumber && (
                <p className="text-[11px] font-medium text-strawberry-red xs:text-sm">
                  {error.phoneNumber}
                </p>
              )}
            </div>
            <input
              id="phone-number"
              className="rounded-md border border-solid border-cool-gray px-4 py-2 focus-visible:outline-purplish-blue"
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="e.g. +1 234 567 890"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="hidden w-full justify-end sm:flex">
          <button
            className="rounded-lg bg-marine-blue px-4 py-2 font-medium text-white"
            aria-label="Go to next form"
            onClick={handleNextStep}
          >
            Next Step
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 flex w-full justify-end bg-white px-3 py-3 sm:hidden">
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
