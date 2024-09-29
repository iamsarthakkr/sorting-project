import { Algorithm, Callback } from "../../types";
import { useBubbleSort } from "./useBubbleSort";
import { useInsertionSort } from "./useInsertionSort";
import { useIteration } from "./useIteration";

export const algoMap: Record<Algorithm, Callback> = {
   [Algorithm.ITERATION]: useIteration,
   [Algorithm.BUBBLE_SORT]: useBubbleSort,
   [Algorithm.INSERTION_SORT]: useInsertionSort,
};
