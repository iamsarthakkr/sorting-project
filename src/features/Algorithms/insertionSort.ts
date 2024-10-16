import { IPayloadGetter, PayloadType } from "../../types";
import { IAlgorithmPayload } from "../App/context";

export const insertionSort: IPayloadGetter = (list) => {
   const toSort = list.map((el) => ({ ...el }));
   const operations: IAlgorithmPayload[] = [];
   for (let start = 0; start < list.length; start++) {
      // update range
      operations.push({
         type: PayloadType.UPDATE_RANGE,
         value: [start, list.length],
      });
      let currIndex = start;
      while (currIndex > 0 && toSort[currIndex] < toSort[currIndex - 1]) {
         operations.push({
            type: PayloadType.UPDATE_ITERATION,
            value: [currIndex],
         });
         operations.push({
            type: PayloadType.UPDATE_SWAP,
            value: [currIndex - 1, currIndex],
         });
      }
   }
   return operations;
};
