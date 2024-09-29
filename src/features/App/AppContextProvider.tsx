import React from "react";
import { AppContext, AppContextActions, IListState } from "./context";
import { IAppContext, IAppContextActions } from "./context";
import { Callback, Callback1, IList, Algorithm } from "../../types";
import { initList } from "../../Utils";

interface IProps {
   children: React.ReactElement;
}

export const AppContextProvider: React.FC<IProps> = (props) => {
   const [list, setList] = React.useState<IList>(initList(40));
   const [listState, setListState] = React.useState<IListState>({
      iteratingIndex: -1,
      iterating: false,
   });
   const [algorithm, setAlgorithm] = React.useState<Algorithm>(
      Algorithm.ITERATION
   );

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

   const toggleIteratingState: Callback = React.useCallback(() => {
      setListState((prev) => {
         return {
            ...prev,
            iterating: !prev.iterating,
         };
      });
   }, [setListState]);

   const resetListState: Callback = React.useCallback(() => {
      setListState({
         iterating: false,
         iteratingIndex: -1,
      });
   }, [setListState]);

   const context: IAppContext = React.useMemo(() => {
      return {
         list,
         listState,
         algorithm,
      };
   }, [list, listState, algorithm]);

   const contextActions: IAppContextActions = React.useMemo(() => {
      return {
         updateIteratingIndex,
         toggleIteratingState,
         resetListState,
         setAlgorithm,
      };
   }, [
      updateIteratingIndex,
      toggleIteratingState,
      resetListState,
      setAlgorithm,
   ]);

   return (
      <AppContext.Provider value={context}>
         <AppContextActions.Provider value={contextActions}>
            {props.children}
         </AppContextActions.Provider>
      </AppContext.Provider>
   );
};
