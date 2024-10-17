import { AlgorithmPayloadGetter } from "../features/Algorithms";
import { Algorithm, PayloadType } from "../types";
import { initList, random, swap } from "../Utils";

describe("Algorithms", () => {
   const sortTest = (algo: Algorithm, size: number) => {
      const arr = initList(size);

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
      for (let test = 0; test < 100; test++) {
         sortTest(Algorithm.BUBBLE_SORT, random(100, 500));
      }
   });
   it("correctly sorts array using insertions sort", () => {
      for (let test = 0; test < 100; test++) {
         sortTest(Algorithm.INSERTION_SORT, random(100, 500));
      }
   });
   it("correctly sorts array using quick sort", () => {
      for (let test = 0; test < 100; test++) {
         sortTest(Algorithm.QUICK_SORT, random(100, 500));
      }
   });
});
