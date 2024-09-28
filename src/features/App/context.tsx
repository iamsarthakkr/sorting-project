import React from "react";
import { Action1, IList } from "../../types";

export type IListState = {
   iteratingIndex: number;
};

export type IAppContext = {
   list: IList;
   listState: IListState;
};

export type IAppContextActions = {
   updateIteratingIndex: Action1<number>;
};

export const AppContext = React.createContext<IAppContext>(
   null as unknown as IAppContext
);

export const AppContextActions = React.createContext<IAppContextActions>(
   null as unknown as IAppContextActions
);
