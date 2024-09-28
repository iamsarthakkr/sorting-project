import React from "react";
import { IList } from "../../types";

export type IAppContext = {
   list: IList;
};

export type IAppContextActions = {};

export const AppContext = React.createContext<IAppContext>(
   null as unknown as IAppContext
);

export const AppContextActions = React.createContext<IAppContextActions>(
   null as unknown as IAppContextActions
);
