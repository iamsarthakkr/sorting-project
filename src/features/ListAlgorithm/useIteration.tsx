import React from "react";
import { useAppContext, useAppContextActions } from "../App/useAppContext";
import { IteratingState } from "../App/context";

export const useIteration = () => {
   const context = useAppContext();
   const { updateIteratingIndex, updateIteratingState, updateStartIndex } =
      useAppContextActions();
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
      if (listState.iteratingIndex === listState.endIndex) {
         updateIteratingState(IteratingState.DONE);
      }

      timerRef.current = setTimeout(() => {
         const newIndex = listState.iteratingIndex + 1;
         updateIteratingIndex(newIndex);
         updateStartIndex(newIndex);
      }, algorithmSpeed);
   }, [
      list,
      listState,
      updateIteratingIndex,
      updateIteratingState,
      updateStartIndex,
      algorithmSpeed,
   ]);
};
