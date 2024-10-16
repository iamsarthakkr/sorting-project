import { Algorithm, IPayloadGetter } from "../../types";
import { bubbleSort } from "./bubbleSort";
import { insertionSort } from "./insertionSort";
import { iteration } from "./iteration";

export const AlgorithmPayloadGetter: Record<Algorithm, IPayloadGetter> = {
   [Algorithm.ITERATION]: iteration,
   [Algorithm.BUBBLE_SORT]: bubbleSort,
   [Algorithm.INSERTION_SORT]: insertionSort,
};
