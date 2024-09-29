import React from "react";
import { Action, Action1, IList, Algorithm } from "../../types";

export type IListState = {
   iteratingIndex: number;
   iterating: boolean;
};

export type IAppContext = {
   list: IList;
   listState: IListState;
   algorithm: Algorithm;
};

export type IAppContextActions = {
   updateIteratingIndex: Action1<number>;
   toggleIteratingState: Action;
   resetListState: Action;
   setAlgorithm: Action1<Algorithm>;
};

export const AppContext = React.createContext<IAppContext>(
   null as unknown as IAppContext
);

export const AppContextActions = React.createContext<IAppContextActions>(
   null as unknown as IAppContextActions
);
