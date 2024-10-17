import React from "react";
import { useAppContext, useAppContextActions } from "../App/useAppContext";
import { IteratingState } from "../App/context";
import { PayloadType } from "../../types";

export const AlgorithmController = () => {
   const context = useAppContext();
   const actions = useAppContextActions();

   const contextRef = React.useRef(context);

   const timerRef = React.useRef<NodeJS.Timer | null>();

   const { algorithmPayload, iteratingState, algorithmSpeed, algorithmIndex } =
      context;
   const {
      updateAlgorithmIndex,
      updateIteratingState,
      updateAlgorithmState,
      swapElements,
   } = actions;

   React.useEffect(() => {
      contextRef.current = context;
   }, [context]);

   // check for start or end of iteration
   React.useEffect(() => {
      if (iteratingState !== IteratingState.ITERATING) {
         return;
      }
      if (algorithmIndex === -1) {
         updateAlgorithmIndex(0);
         return;
      }
      if (algorithmIndex === algorithmPayload.length) {
         updateIteratingState(IteratingState.DONE);
         return;
      }
   }, [
      iteratingState,
      algorithmPayload,
      algorithmIndex,
      updateAlgorithmIndex,
      updateIteratingState,
      updateAlgorithmState,
   ]);

   // algorithm visualization
   React.useEffect(() => {
      if (timerRef.current) {
         clearTimeout(timerRef.current);
         timerRef.current = null;
      }
      if (iteratingState !== IteratingState.ITERATING) {
         return;
      }
      if (algorithmIndex < 0 || algorithmIndex >= algorithmPayload.length) {
         return;
      }
      const interval =
         algorithmIndex > 0 &&
         (algorithmPayload[algorithmIndex - 1].type ===
            PayloadType.SWAP_BEGIN ||
            algorithmPayload[algorithmIndex - 1].type === PayloadType.SWAP_END)
            ? algorithmSpeed === 0
               ? 200
               : 2 * algorithmSpeed
            : algorithmSpeed;
      timerRef.current = setTimeout(() => {
         const { type, value } = algorithmPayload[algorithmIndex];
         switch (type) {
            case PayloadType.RANGE_UPDATE: {
               updateAlgorithmState("iteratingRange", value);
               updateAlgorithmState("iteratingIndices", []);
               updateAlgorithmState("swappingIndices", []);
               break;
            }
            case PayloadType.ITERATION: {
               updateAlgorithmState("iteratingIndices", value);
               updateAlgorithmState("swappingIndices", []);
               break;
            }
            case PayloadType.SWAP_BEGIN: {
               // swap
               updateAlgorithmState("swappingIndices", value);
               updateAlgorithmState("iteratingIndices", []);
               break;
            }
            case PayloadType.SWAP_END: {
               swapElements(value[0], value[1]);
               break;
            }
            default: {
               break;
            }
         }
         updateAlgorithmIndex(algorithmIndex + 1);
      }, interval);
   }, [
      iteratingState,
      algorithmSpeed,
      algorithmPayload,
      algorithmIndex,
      updateAlgorithmState,
      swapElements,
      updateAlgorithmIndex,
   ]);

   return <></>;
};
