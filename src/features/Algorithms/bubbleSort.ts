import { IList, PayloadType } from "../../types";
import { swap } from "../../Utils";
import { IAlgorithmPayload } from "../App/context";

export const bubbleSort = (list: IList): IAlgorithmPayload[] => {
   let toSort = list.map((el) => {
      return { ...el };
   });

   const operations: IAlgorithmPayload[] = [];
   for (let end = toSort.length; end >= 0; end--) {
      // update iterating range
      operations.push({ type: PayloadType.UPDATE_RANGE, value: [0, end] });
      for (let iteratingIndex = 0; iteratingIndex < end; iteratingIndex++) {
         // update iterating index
         operations.push({
            type: PayloadType.UPDATE_ITERATION,
            value: [iteratingIndex],
         });
         if (
            iteratingIndex + 1 < end &&
            toSort[iteratingIndex + 1].value < toSort[iteratingIndex].value
         ) {
            // swap operation
            operations.push({
               type: PayloadType.UPDATE_SWAP,
               value: [
                  toSort[iteratingIndex].index,
                  toSort[iteratingIndex + 1].index,
               ],
            });
            swap(
               toSort,
               toSort[iteratingIndex].index,
               toSort[iteratingIndex + 1].index
            );
         }
      }
   }
   operations.push({ type: PayloadType.UPDATE_ITERATION, value: [-1] });
   return operations;
};
