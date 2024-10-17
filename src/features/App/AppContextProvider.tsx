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

const NUM_ELEMENTS = 50;

export const AppContextProvider: React.FC<IProps> = (props) => {
   const [list, setList] = React.useState<IList>(initList(NUM_ELEMENTS));
   const [algorithm, setAlgorithm] = React.useState<Algorithm>(
      Algorithm.BUBBLE_SORT
   );
   const [algorithmSpeed, setAlgorithmSpeed] = React.useState(0);
   const [algorithmPayload, setAlgorithmPayload] = React.useState<
      IAlgorithmPayload[]
   >(AlgorithmPayloadGetter[algorithm](list));
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

   const updateList = React.useCallback((newList: IList, algo: Algorithm) => {
      const payloadGetter = AlgorithmPayloadGetter[algo];
      const newPayload = payloadGetter(newList);
      setAlgorithmPayload(newPayload);
      setAlgorithmState(getInitAlgoState(newList));
      setIteratingState(IteratingState.NONE);
      setAlgorithmIndex(-1);
   }, []);

   const updateAlgorithm: IAppContextActions["updateAlgorithm"] =
      React.useCallback(
         (algo) => {
            updateList(list, algo);
            setAlgorithm(algo);
         },
         [list, updateList]
      );

   const reset: IAppContextActions["reset"] = React.useCallback(() => {
      const newList = initList(list.length);
      updateList(newList, algorithm);
      setList(newList);
   }, [list, algorithm, updateList]);

   const updateListSize: IAppContextActions["updateListSize"] =
      React.useCallback(
         (newSize) => {
            const listSize = list.length;
            if (newSize === listSize) {
               return;
            }
            const newList = list.map((el) => ({ ...el }));
            while (newList.length > newSize) {
               newList.pop();
            }
            const extra = Math.max(0, newSize - listSize);
            const extraList = initList(extra);
            newList.push(...extraList);
            newList.forEach((el, id) => {
               newList[id].index = id;
            });
            updateList(newList, algorithm);
            setList(newList);
         },
         [list, updateList, algorithm]
      );

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
         updateListSize,
         updateIteratingState: setIteratingState,
         updateAlgorithmPayload: setAlgorithmPayload,
         updateAlgorithmSpeed: setAlgorithmSpeed,
         updateAlgorithmIndex: setAlgorithmIndex,
         updateAlgorithm,
         updateAlgorithmState,
         swapElements,
         reset,
      };
   }, [
      updateAlgorithm,
      updateAlgorithmState,
      swapElements,
      reset,
      updateListSize,
   ]);
   console.log({ context });

   return (
      <AppContext.Provider value={context}>
         <AppContextActions.Provider value={contextActions}>
            {props.children}
         </AppContextActions.Provider>
      </AppContext.Provider>
   );
};
