import { Algorithm, Callback } from "../../types";
import { useIteration } from "./useIteration";

export const algoMap: Record<Algorithm, Callback> = {
   [Algorithm.ITERATION]: useIteration,
   [Algorithm.SEARCH]: useIteration,
};
