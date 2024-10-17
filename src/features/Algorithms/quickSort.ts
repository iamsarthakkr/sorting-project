import { IPayloadGetter, PayloadType } from "../../types";
import { random, swap } from "../../Utils";
import { IAlgorithmPayload } from "../App/context";

export const quickSort: IPayloadGetter = (list) => {
   const toSort = list.map((el) => ({ ...el }));
   const operations: IAlgorithmPayload[] = [];

   const sort_rec = (start: number, end: number) => {
      if (start >= end) {
         return;
      }
      operations.push({ type: PayloadType.UPDATE_RANGE, value: [start, end] });

      const pivot = random(start, end - 1);
      const pivot_val = toSort[pivot].value;
      // partition
      let l = start;
      for (let iteratingIndex = start; iteratingIndex < end; iteratingIndex++) {
         operations.push({
            type: PayloadType.UPDATE_ITERATION,
            value: [iteratingIndex, l],
         });
         if (toSort[iteratingIndex].value < pivot_val) {
            swap(toSort, toSort[iteratingIndex].index, toSort[l].index);
            operations.push({
               type: PayloadType.UPDATE_SWAP,
               value: [toSort[iteratingIndex].index, toSort[l].index],
            });
            l++;
         }
      }
      let r = l;
      while (r < end && toSort[r].value === pivot_val) r++;
      sort_rec(start, l);
      sort_rec(r, end);
   };

   sort_rec(0, toSort.length);
   operations.push({
      type: PayloadType.UPDATE_RANGE,
      value: [toSort.length, toSort.length],
   });
   return operations;
};
