import { AlgorithmPayloadGetter } from "../features/Algorithms";
import { Algorithm, PayloadType } from "../types";
import { initList, swap } from "../Utils";

describe("Algorithms", () => {
   const sortTest = (algo: Algorithm) => {
      const arr = initList(100);

      const numsSorted = arr.map((el) => el.value);
      numsSorted.sort((a, b) => {
         return a - b;
      });
      const payloadGetter = AlgorithmPayloadGetter[algo];
      const operations = payloadGetter(arr);

      for (const op of operations) {
         if (op.type === PayloadType.UPDATE_SWAP) {
            const [i1, i2] = op.value;
            swap(arr, i1, i2);
         }
      }
      const nums = arr.map((el) => el.value);
      expect(numsSorted).toEqual(nums);
   };
   it("correctly sorts array using bubble sort", () => {
      sortTest(Algorithm.BUBBLE_SORT);
   });
   it("correctly sorts array using insertions sort", () => {
      sortTest(Algorithm.INSERTION_SORT);
   });
});
