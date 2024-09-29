import React from "react";
import { Action, Action1, IList, Algorithm } from "../../types";

export enum IteratingState {
   NONE,
   ITERATING,
   DONE,
}

export type IListState = {
   iteratingIndex: number;
   iterating: IteratingState;
   startIndex: number;
   endIndex: number;
};

export type IAppContext = {
   list: IList;
   listState: IListState;
   algorithm: Algorithm;
};

export type IAppContextActions = {
   updateIteratingIndex: Action1<number>;
   updateIteratingState: Action1<IteratingState>;
   resetListState: Action;
   setAlgorithm: Action1<Algorithm>;
   updateStartIndex: Action1<number>;
   updateEndIndex: Action1<number>;
};

export const AppContext = React.createContext<IAppContext>(
   null as unknown as IAppContext
);

export const AppContextActions = React.createContext<IAppContextActions>(
   null as unknown as IAppContextActions
);
