// Import React's Context API and useReducer function
import { createContext, useReducer } from "react";

// ! Create two contexts: one for the state and another for the dispatch function
// The BuyerContext and DispatchContext are created as separate contexts. BuyerContext provides the current state of the buyers list and DispatchContext provides a dispatch function to update the state.
export const BuyerContext = createContext();
export const DistpatchContext = createContext();

// ! Define the initial state of the context
// The initialState object defines the initial values for the state of the context. It includes an empty array for buyersList and several string variables for the name, email, phone, price, minSize, zipCode, and propertyType of the property that potential buyers may be interested in. It also includes a boolean checkbox variable to track whether the user has agreed to receive marketing materials.
const initialState = {
  buyersList: [], // list of buyers
  name: "", // name of the user
  email: "", // email of the user
  phone: "", // phone number of the user
  price: "", // desired price of the property
  minSize: "", // minimum size of the property
  zipCode: "", // zip code of the property
  propertyType: "", // type of the property
  checkbox: false, // a checkbox value
};

// ! Define a reducer function that updates the state
// The reducer function is defined to handle updates to the state of the context. It receives the current state and an action object that describes the update to be made. The console.log statement is used to print out the current state and action whenever the reducer function is called.
export function reducer(state, action) {
  console.log({ state, action }); // log the state and action

  //! Use a switch statement to determine what action to perform
  // The switch statement in the reducer function handles different actions that can be performed on the state. The SET_ESTATE_INFO action updates multiple fields of the state at once. The TOGGLE_BUYER action either adds or removes a buyer from the buyersList array. The REMOVE_CHOSEN_BUYER action removes a buyer from the buyersList array. The MERGE_CONTACT_INFO action updates the name, email, phone, and checkbox fields of the state.
  switch (action.action) {
    case "SET_ESTATE_INFO":
      // Merge the current state with the payload
      return { ...state, ...action.payload };

    case "TOGGLE_BUYER":
      // Check if the buyer exists in the buyers list
      const exists = state.buyersList.find(
        (buyer) => buyer.id === action.payload.id
      );
      if (exists) {
        // Remove the buyer if they exist
        return {
          ...state,
          buyersList: state.buyersList.filter(
            (obj) => action.payload.id !== obj.id
          ),
        };
      } else {
        // Add the buyer if they don't exist
        return {
          ...state,
          buyersList: state.buyersList.concat(action.payload),
        };
      }

    case "REMOVE_CHOSEN_BUYER":
      // Remove the chosen buyer from the buyers list
      return {
        ...state,
        buyersList: state.buyersList.filter(
          (obj) => action.payload.id !== obj.id
        ),
      };
    case "MERGE_CONTACT_INFO":
      // Merge the contact info with the current state
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        phone: action.payload.phone,
        checkbox: action.payload.checkbox,
      };
  }
  // Return the state if the action doesn't match any of the cases
  return { ...state };
}

//! Create a context provider component that wraps its children with the BuyerContext and DistpatchContext providers
// The BuyerListProvider function is defined to provide the state and dispatch functions to its children components using the BuyerContext.Provider and DispatchContext.Provider components. It uses the useReducer hook to create a state object data and a dispatch function dispatch based on the reducer function and initialState. Finally, it renders its children components as a child of the context providers.
export const BuyerListProvider = ({ children }) => {
  const [data, dispatch] = useReducer(reducer, initialState); // Use useReducer to manage the state
  return (
    <BuyerContext.Provider value={data}>
      <DistpatchContext.Provider value={dispatch}>
        {children}
      </DistpatchContext.Provider>
    </BuyerContext.Provider>
  );
};
