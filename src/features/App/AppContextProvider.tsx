import React from "react";
import {
   AppContext,
   AppContextActions,
   IAlgorithmPayload,
   IAlgorithmState,
   IteratingState,
} from "./context";
import { IAppContext, IAppContextActions } from "./context";
import { IList, Algorithm } from "../../types";
import { initList, swap } from "../../Utils";
import { AlgorithmPayloadGetter } from "../Algorithms";

interface IProps {
   children: React.ReactElement;
}

export const getInitAlgoState = (list: IList): IAlgorithmState => {
   return {
      iteratingIndices: [],
      iteratingRange: [0, list.length],
      swappingIndices: [],
   };
};

const NUM_ELEMENTS = 10;

export const AppContextProvider: React.FC<IProps> = (props) => {
   const [list, setList] = React.useState<IList>(initList(NUM_ELEMENTS));
   const [algorithm, setAlgorithm] = React.useState<Algorithm>(
      Algorithm.BUBBLE_SORT
   );
   const [algorithmSpeed, setAlgorithmSpeed] = React.useState(0);
   const [algorithmPayload, setAlgorithmPayload] = React.useState<
      IAlgorithmPayload[]
   >([]);
   const [algorithmState, setAlgorithmState] = React.useState<IAlgorithmState>(
      getInitAlgoState(list)
   );
   const [iteratingState, setIteratingState] = React.useState<IteratingState>(
      IteratingState.NONE
   );
   const [algorithmIndex, setAlgorithmIndex] = React.useState(-1);

   const updateAlgorithmState: IAppContextActions["updateAlgorithmState"] =
      React.useCallback((key, value) => {
         setAlgorithmState((prev) => {
            return {
               ...prev,
               [key]: value,
            };
         });
      }, []);

   const reset: IAppContextActions["reset"] = React.useCallback(() => {
      const newList = initList(NUM_ELEMENTS);
      const payloadGetter = AlgorithmPayloadGetter[algorithm];
      const newPayload = payloadGetter(newList);
      setList(newList);
      setAlgorithmState(getInitAlgoState(newList));
      setAlgorithmPayload(newPayload);
      setIteratingState(IteratingState.NONE);
      setAlgorithmIndex(-1);
   }, [algorithm]);

   const swapElements: IAppContextActions["swapElements"] = React.useCallback(
      (i1, i2) => {
         setList((prev) => {
            const newList = prev.map((el) => ({ ...el }));
            swap(newList, i1, i2);
            return newList;
         });
      },
      []
   );

   const context: IAppContext = React.useMemo(() => {
      return {
         list,
         algorithm,
         algorithmSpeed,
         algorithmPayload,
         algorithmState,
         algorithmIndex,
         iteratingState,
      };
   }, [
      list,
      algorithm,
      algorithmSpeed,
      algorithmPayload,
      algorithmState,
      algorithmIndex,
      iteratingState,
   ]);

   const contextActions: IAppContextActions = React.useMemo(() => {
      return {
         updateAlgorithm: setAlgorithm,
         updateIteratingState: setIteratingState,
         updateAlgorithmPayload: setAlgorithmPayload,
         updateAlgorithmSpeed: setAlgorithmSpeed,
         updateAlgorithmIndex: setAlgorithmIndex,
         updateAlgorithmState,
         swapElements,
         reset,
      };
   }, [updateAlgorithmState, swapElements, reset]);
   console.log({ context });

   return (
      <AppContext.Provider value={context}>
         <AppContextActions.Provider value={contextActions}>
            {props.children}
         </AppContextActions.Provider>
      </AppContext.Provider>
   );
};
