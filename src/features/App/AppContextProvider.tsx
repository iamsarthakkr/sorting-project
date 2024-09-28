import React from "react";
import { AppContext, AppContextActions } from "./context";
import { IAppContext, IAppContextActions } from "./context";
import { IList } from "../../types";
import { initList } from "../../Utils";

interface IProps {
   children: React.ReactElement;
}

export const AppContextProvider: React.FC<IProps> = (props) => {
   const [list, setList] = React.useState<IList>(initList(40));

   const context: IAppContext = React.useMemo(() => {
      return {
         list,
      };
   }, [list]);

   const contextActions: IAppContextActions = React.useMemo(() => {
      return {};
   }, []);

   return (
      <AppContext.Provider value={context}>
         <AppContextActions.Provider value={contextActions}>
            {props.children}
         </AppContextActions.Provider>
      </AppContext.Provider>
   );
};
