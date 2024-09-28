import React from "react";
import { AppContext, AppContextActions } from "./context";

export const useAppContext = () => {
   return React.useContext(AppContext);
};

export const useAppContextActions = () => {
   return React.useContext(AppContextActions);
};
