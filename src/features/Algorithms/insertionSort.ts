import { IPayloadGetter, PayloadType } from "../../types";
import { swap } from "../../Utils";
import { IAlgorithmPayload } from "../App/context";

export const insertionSort: IPayloadGetter = (list) => {
   const toSort = list.map((el) => ({ ...el }));
   const operations: IAlgorithmPayload[] = [];
   for (let start = 0; start < list.length; start++) {
      // update range
      operations.push({
         type: PayloadType.RANGE_UPDATE,
         value: [start, list.length],
      });
      operations.push({
         type: PayloadType.ITERATION,
         value: [toSort[start].index],
      });
      let currIndex = start;
      while (
         currIndex > 0 &&
         toSort[currIndex].value < toSort[currIndex - 1].value
      ) {
         operations.push({
            type: PayloadType.SWAP_BEGIN,
            value: [toSort[currIndex - 1].index, toSort[currIndex].index],
         });
         swap(toSort, toSort[currIndex - 1].index, toSort[currIndex].index);
         operations.push({
            type: PayloadType.SWAP_END,
            value: [toSort[currIndex - 1].index, toSort[currIndex].index],
         });
         currIndex--;
      }
   }
   operations.push({
      type: PayloadType.RANGE_UPDATE,
      value: [toSort.length, toSort.length],
   });
   return operations;
};
