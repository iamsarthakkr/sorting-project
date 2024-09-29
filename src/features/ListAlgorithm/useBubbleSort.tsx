import React from "react";
import { useAppContext, useAppContextActions } from "../App/useAppContext";
import { IteratingState } from "../App/context";

export const useBubbleSort = () => {
   const context = useAppContext();
   const actions = useAppContextActions();
   const { list, listState } = context;
   const timerRef = React.useRef<NodeJS.Timeout | undefined>();

   React.useEffect(() => {
      if (timerRef.current) {
         clearTimeout(timerRef.current);
         timerRef.current = undefined;
      }
      if (listState.iterating !== IteratingState.ITERATING) {
         return;
      }
      if (listState.iteratingIndex === listState.endIndex) {
         const newEndIndex = listState.endIndex - 1;
         if (newEndIndex === listState.startIndex) {
            actions.updateIteratingState(IteratingState.DONE);
            actions.updateIteratingIndex(-1);
         } else {
            actions.updateIteratingIndex(listState.startIndex);
         }
         actions.updateEndIndex(newEndIndex);
         return;
      }

      timerRef.current = setTimeout(() => {
         const currIdx = listState.iteratingIndex;
         if (
            currIdx + 1 < listState.endIndex &&
            list[currIdx].value > list[currIdx + 1].value
         ) {
            actions.swapElements(currIdx, currIdx + 1);
         }
         const newIndex = listState.iteratingIndex + 1;
         actions.updateIteratingIndex(newIndex);
      }, 10);
   }, [list, listState, actions]);
};
