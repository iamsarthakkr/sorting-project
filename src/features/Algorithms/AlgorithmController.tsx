import React from "react";
import { useAppContext, useAppContextActions } from "../App/useAppContext";
import { IteratingState } from "../App/context";
import { PayloadType } from "../../types";
import { AlgorithmPayloadGetter } from "./algorithmPayloadGetters";

export const AlgorithmController = () => {
   const context = useAppContext();
   const actions = useAppContextActions();

   const contextRef = React.useRef(context);

   const timerRef = React.useRef<NodeJS.Timer | null>();

   const {
      algorithm,
      algorithmPayload,
      iteratingState,
      algorithmSpeed,
      algorithmIndex,
   } = context;
   const {
      updateAlgorithmPayload,
      updateAlgorithmIndex,
      updateIteratingState,
      updateAlgorithmState,
      swapElements,
   } = actions;

   React.useEffect(() => {
      contextRef.current = context;
   }, [context]);

   // set the payload of algorithm
   React.useEffect(() => {
      const payloadGetter = AlgorithmPayloadGetter[algorithm];
      const newPayload = payloadGetter(contextRef.current.list);
      updateAlgorithmPayload(newPayload);
   }, [updateAlgorithmPayload, algorithm]);

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
      timerRef.current = setTimeout(() => {
         const { type, value } = algorithmPayload[algorithmIndex];
         switch (type) {
            case PayloadType.UPDATE_RANGE: {
               updateAlgorithmState("iteratingRange", value);
               updateAlgorithmState("iteratingIndices", []);
               updateAlgorithmState("swappingIndices", []);
               break;
            }
            case PayloadType.UPDATE_ITERATION: {
               updateAlgorithmState("iteratingIndices", value);
               updateAlgorithmState("swappingIndices", []);
               break;
            }
            case PayloadType.UPDATE_SWAP: {
               // swap
               updateAlgorithmState("swappingIndices", value);
               updateAlgorithmState("iteratingIndices", []);
               swapElements(value[0], value[1]);
               break;
            }
            default: {
               break;
            }
         }
         updateAlgorithmIndex(algorithmIndex + 1);
      }, algorithmSpeed);
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
