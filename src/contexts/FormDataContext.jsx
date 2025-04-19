import { createContext, useReducer } from "react";
import { formDataReducer } from "../reducers/formDataReducer";

export const FormDataContext = createContext(null);
export const FormDataDispatchContext = createContext(null);

export function FormDataContextProvider({ children }) {
  const [formData, dispatch] = useReducer(formDataReducer, {
    name: "",
    email: "",
    phoneNumber: "",
    plan: {
      name: "Acarde",
      price: 0,
      billingType: "monthly",
    },
    addOns: [],
  });
  return (
    <FormDataContext.Provider value={formData}>
      <FormDataDispatchContext.Provider value={dispatch}>
        {children}
      </FormDataDispatchContext.Provider>
    </FormDataContext.Provider>
  );
}
