import React from "react";
import styled from "styled-components";
import { Button, Slider } from "@mui/material";
import { Center, Flex } from "../../components";
import { useAppContext, useAppContextActions } from "../App/useAppContext";
import { Select } from "../../components/Select";
import { Algorithms } from "../../Constants";
import { Algorithm } from "../../types";
import { IteratingState } from "../App/context";

const Container = styled(Flex)`
   width: 100%;
   height: 70px;
   margin-top: 10px;
   align-items: center;
   flex-direction: row;
   justify-content: space-around;
`;

const SelectCont = styled.div`
   font-size: 14px;
   width: 150px;
`;

const SliderCont = styled.div`
   width: 120px;
`;

const ButtonCont = styled.div`
   display: flex;
   gap: 5px;
`;

export const Header = () => {
   const context = useAppContext();
   const appActions = useAppContextActions();

   const { updateIteratingState } = appActions;
   const { iteratingState, algorithm } = context;

   const updateAlgo = React.useCallback(
      (val: string) => {
         appActions.updateAlgorithm(val as Algorithm);
      },
      [appActions]
   );

   const onChangeSpeed = React.useCallback(
      (_e: Event, v: number | number[]) => {
         const speed: number = v as number;
         appActions.updateAlgorithmSpeed(speed);
      },
      [appActions]
   );

   const toggleIteratingState = React.useCallback(() => {
      if (iteratingState === IteratingState.NONE) {
         updateIteratingState(IteratingState.ITERATING);
         // set the payload for iterating maybe ?
         return;
      }
      if (iteratingState === IteratingState.ITERATING) {
         updateIteratingState(IteratingState.PAUSED);
         return;
      }
      // iteratingState === IteratingState.PAUSED
      updateIteratingState(IteratingState.ITERATING);
   }, [updateIteratingState, iteratingState]);

   const disabledToggle = iteratingState === IteratingState.DONE;
   const toggleText =
      iteratingState === IteratingState.NONE
         ? "Start"
         : iteratingState === IteratingState.ITERATING
         ? "Pause"
         : iteratingState === IteratingState.PAUSED
         ? "Continue"
         : "Start";

   return (
      <Container>
         <SelectCont>
            <Select
               value={algorithm}
               options={Algorithms}
               onChange={updateAlgo}
            />
         </SelectCont>
         <SliderCont>
            <Center>Speed</Center>
            <Slider
               size="medium"
               defaultValue={0}
               onChange={onChangeSpeed}
               valueLabelDisplay="auto"
               step={20}
               marks
               min={0}
               max={200}
            />
         </SliderCont>
         <ButtonCont>
            <Button
               size="medium"
               onClick={toggleIteratingState}
               variant="contained"
               disabled={disabledToggle}
               color="info"
            >
               {toggleText}
            </Button>
            <Button
               size="medium"
               onClick={appActions.reset}
               variant="contained"
               color="info"
            >
               Reset
            </Button>
         </ButtonCont>
      </Container>
   );
};
