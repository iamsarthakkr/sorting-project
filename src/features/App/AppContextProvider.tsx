import React from "react";
import {
   AppContext,
   AppContextActions,
   IListState,
   IteratingState,
} from "./context";
import { IAppContext, IAppContextActions } from "./context";
import { Callback, Callback1, IList, Algorithm, Callback2 } from "../../types";
import { initList } from "../../Utils";

interface IProps {
   children: React.ReactElement;
}

const getInitState = (list: IList): IListState => {
   return {
      iteratingIndex: -1,
      iterating: IteratingState.NONE,
      startIndex: 0,
      endIndex: list.length,
   };
};

const NUM_ELEMENTS = 70;

export const AppContextProvider: React.FC<IProps> = (props) => {
   const [list, setList] = React.useState<IList>(initList(NUM_ELEMENTS));
   const [listState, setListState] = React.useState<IListState>(
      getInitState(list)
   );
   const [algorithm, setAlgorithm] = React.useState<Algorithm>(
      Algorithm.BUBBLE_SORT
   );
   const [algorithmSpeed, setAlgorithmSpeed] = React.useState(0);

   const updateIteratingIndex: Callback1<number> = React.useCallback(
      (index) => {
         setListState((prev) => {
            return {
               ...prev,
               iteratingIndex: index,
            };
         });
      },
      [setListState]
   );

   const updateIteratingState: Callback1<IteratingState> = React.useCallback(
      (state) => {
         setListState((prev) => {
            return {
               ...prev,
               iterating: state,
            };
         });
      },
      [setListState]
   );

   const reset: Callback = React.useCallback(() => {
      const newList = initList(NUM_ELEMENTS);
      setList(newList);
      setListState(getInitState(newList));
   }, [setListState, setList]);

   const updateStartIndex: Callback1<number> = React.useCallback(
      (index) => {
         setListState((prev) => {
            return {
               ...prev,
               startIndex: index,
            };
         });
      },
      [setListState]
   );

   const updateEndIndex: Callback1<number> = React.useCallback(
      (index) => {
         setListState((prev) => {
            return {
               ...prev,
               endIndex: index,
            };
         });
      },
      [setListState]
   );

   const swapElements: Callback2<number, number> = React.useCallback(
      (i1, i2) => {
         setList((prev) => {
            const newList = prev.map((el) => ({ ...el }));
            const t = newList[i1];
            newList[i1] = newList[i2];
            newList[i2] = t;
            return newList.map((el, idx) => ({ ...el, index: idx }));
         });
      },
      []
   );

   const context: IAppContext = React.useMemo(() => {
      return {
         list,
         listState,
         algorithm,
         algorithmSpeed,
      };
   }, [list, listState, algorithm, algorithmSpeed]);

   const contextActions: IAppContextActions = React.useMemo(() => {
      return {
         updateIteratingIndex,
         updateIteratingState,
         reset,
         setAlgorithm,
         updateStartIndex,
         updateEndIndex,
         swapElements,
         setAlgorithmSpeed,
      };
   }, [
      updateIteratingIndex,
      updateIteratingState,
      reset,
      setAlgorithm,
      updateStartIndex,
      updateEndIndex,
      swapElements,
      setAlgorithmSpeed,
   ]);

   return (
      <AppContext.Provider value={context}>
         <AppContextActions.Provider value={contextActions}>
            {props.children}
         </AppContextActions.Provider>
      </AppContext.Provider>
   );
};
