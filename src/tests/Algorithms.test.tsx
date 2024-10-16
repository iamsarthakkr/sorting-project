import { bubbleSort } from "../features/Algorithms/bubbleSort";
import { PayloadType } from "../types";
import { initList, swap } from "../Utils";

describe("Algorithms", () => {
   it("correctly sorts array using bubble sort", () => {
      const arr = initList(100);

      const numsSorted = arr.map((el) => el.value);
      numsSorted.sort((a, b) => {
         return a - b;
      });
      const operations = bubbleSort(arr);

      for (const op of operations) {
         if (op.type === PayloadType.UPDATE_SWAP) {
            const [i1, i2] = op.value;
            swap(arr, i1, i2);
         }
      }
      const nums = arr.map((el) => el.value);

      console.log({ operations });

      console.log({ nums });
      console.log({ numsSorted });
      expect(numsSorted).toEqual(nums);
   });
});
