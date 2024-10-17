import { IList, PayloadType } from "../../types";
import { IAlgorithmPayload } from "../App/context";

export const iteration = (list: IList): IAlgorithmPayload[] => {
   const operations: IAlgorithmPayload[] = [];
   // set iterating range -> already set ?
   operations.push({
      type: PayloadType.ITERATION,
      value: [0, list.length],
   });
   for (let i = 0; i < list.length; i++) {
      operations.push({
         type: PayloadType.ITERATION,
         value: [i],
      });
   }
   return operations;
};
