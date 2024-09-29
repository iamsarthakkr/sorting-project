import React from "react";
import { useAppContext, useAppContextActions } from "../App/useAppContext";
import { IteratingState } from "../App/context";

export const useInsertionSort = () => {
   const context = useAppContext();
   const actions = useAppContextActions();
   const { list, listState, algorithmSpeed } = context;
   const timerRef = React.useRef<NodeJS.Timeout | undefined>();

   React.useEffect(() => {
      if (timerRef.current) {
         clearTimeout(timerRef.current);
         timerRef.current = undefined;
      }
      if (listState.iterating !== IteratingState.ITERATING) {
         return;
      }

      timerRef.current = setTimeout(() => {
         if (listState.startIndex === listState.endIndex) {
            actions.updateIteratingIndex(-1);
            actions.updateIteratingState(IteratingState.DONE);
            return;
         }
         const currIdx = listState.iteratingIndex;

         if (
            listState.iteratingIndex === 0 ||
            list[currIdx - 1].value <= list[currIdx].value
         ) {
            const newStartIndex = listState.startIndex + 1;
            actions.updateStartIndex(newStartIndex);
            actions.updateIteratingIndex(newStartIndex);
            return;
         }

         actions.swapElements(currIdx, currIdx - 1);
         const newIndex = listState.iteratingIndex - 1;
         actions.updateIteratingIndex(newIndex);
      }, algorithmSpeed);
   }, [list, listState, actions, algorithmSpeed]);
};
