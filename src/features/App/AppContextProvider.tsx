import React from "react";
import { AppContext, AppContextActions, IListState } from "./context";
import { IAppContext, IAppContextActions } from "./context";
import { Callback1, IList } from "../../types";
import { initList } from "../../Utils";

interface IProps {
   children: React.ReactElement;
}

export const AppContextProvider: React.FC<IProps> = (props) => {
   const [list, setList] = React.useState<IList>(initList(40));
   const [listState, setListState] = React.useState<IListState>({
      iteratingIndex: -1,
   });

   const updateIteratingIndex: Callback1<number> = (index) => {
      setListState((prev) => {
         return {
            ...prev,
            iteratingIndex: index,
         };
      });
   };

   const context: IAppContext = React.useMemo(() => {
      return {
         list,
         listState,
      };
   }, [list, listState]);

   const contextActions: IAppContextActions = React.useMemo(() => {
      return {
         updateIteratingIndex,
      };
   }, []);

   return (
      <AppContext.Provider value={context}>
         <AppContextActions.Provider value={contextActions}>
            {props.children}
         </AppContextActions.Provider>
      </AppContext.Provider>
   );
};
