import React from "react";
import { useAppContext } from "../App/useAppContext";
import { algoMap } from "./algoMap";

export const ListAlgorithm = () => {
   const { algorithm } = useAppContext();
   const useAlgorithm = React.useMemo(() => {
      return algoMap[algorithm];
   }, [algorithm]);

   useAlgorithm();
   return <></>;
};
