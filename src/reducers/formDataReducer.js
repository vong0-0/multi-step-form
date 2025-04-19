export function formDataReducer(formData, action) {
  switch (action.type) {
    case "change": {
      return { ...formData, [action.name]: action.value };
    }
    case "select_plan": {
      return {
        ...formData,
        plan: {
          name: action.name,
          price: action.price,
          billingType: action.billingType,
        },
      };
    }
    case "select_add_ons": {
      return {
        ...formData,
        addOns: action.addOns,
      };
    }
    default: {
      console.error(`Unknown action type: "${action.type}"`);
      return formData;
    }
  }
}
