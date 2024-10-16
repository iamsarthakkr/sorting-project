import React from "react";
import {
   Action,
   Action1,
   IList,
   Algorithm,
   Action2,
   PayloadType,
} from "../../types";

export enum IteratingState {
   NONE,
   ITERATING,
   PAUSED,
   DONE,
}

export type IAlgorithmState = {
   iteratingIndices: Array<number>;
   iteratingRange: Array<number>;
   swappingIndices: Array<number>;
};

export type IAlgoStateKey = keyof IAlgorithmState;

export type IAlgorithmPayload = {
   type: PayloadType;
   value: Array<number>;
};

export type IAppContext = {
   list: IList;
   algorithm: Algorithm;
   iteratingState: IteratingState;
   algorithmSpeed: number;
   algorithmState: IAlgorithmState;
   algorithmIndex: number;
   algorithmPayload: IAlgorithmPayload[];
};

export type IAppContextActions = {
   updateAlgorithmSpeed: Action1<number>;
   updateAlgorithm: Action1<Algorithm>;
   updateIteratingState: Action1<IteratingState>;
   updateAlgorithmPayload: Action1<IAlgorithmPayload[]>;
   updateAlgorithmState: Action2<IAlgoStateKey, Array<number>>;
   updateAlgorithmIndex: Action1<number>;
   swapElements: Action2<number, number>;
   reset: Action;
};

export const AppContext = React.createContext<IAppContext>(
   null as unknown as IAppContext
);

export const AppContextActions = React.createContext<IAppContextActions>(
   null as unknown as IAppContextActions
);
