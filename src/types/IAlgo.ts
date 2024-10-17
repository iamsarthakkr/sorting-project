import { IAlgorithmPayload } from "../features/App/context";
import { IList } from "./IList";

export type IPayloadGetter = (list: IList) => IAlgorithmPayload[];

export enum Algorithm {
   ITERATION = "iteration",
   BUBBLE_SORT = "bubble_sort",
   INSERTION_SORT = "insertion_sort",
   QUICK_SORT = "quick_sort",
}

export enum PayloadType {
   UPDATE_RANGE,
   UPDATE_ITERATION,
   UPDATE_SWAP,
}
