import React from "react";
import { useAppContext, useAppContextActions } from "../App/useAppContext";

export const useIteration = () => {
   const context = useAppContext();
   const { updateIteratingIndex } = useAppContextActions();
   const { list, listState } = context;
   const timerRef = React.useRef<NodeJS.Timeout | undefined>();
   React.useEffect(() => {
      if (timerRef.current) {
         clearTimeout(timerRef.current);
         timerRef.current = undefined;
      }
      if (!listState.iterating) {
         return;
      }

      timerRef.current = setTimeout(() => {
         const newIndex =
            listState.iteratingIndex === list.length
               ? 0
               : listState.iteratingIndex + 1;
         updateIteratingIndex(newIndex);
      }, 100);
   }, [
      list,
      listState.iterating,
      listState.iteratingIndex,
      updateIteratingIndex,
   ]);
};
