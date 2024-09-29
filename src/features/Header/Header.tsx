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
   const { listState, algorithm } = useAppContext();
   const {
      updateIteratingState,
      reset,
      setAlgorithm,
      updateIteratingIndex,
      setAlgorithmSpeed,
   } = useAppContextActions();

   const updateAlgo = React.useCallback(
      (val: string) => {
         setAlgorithm(val as Algorithm);
      },
      [setAlgorithm]
   );

   const onChangeSpeed = React.useCallback(
      (_e: Event, v: number | number[]) => {
         const speed: number = v as number;
         setAlgorithmSpeed(speed);
      },
      [setAlgorithmSpeed]
   );

   const toggleIteratingState = React.useCallback(() => {
      if (listState.iterating === IteratingState.NONE) {
         updateIteratingState(IteratingState.ITERATING);
         updateIteratingIndex(listState.startIndex);
      }
      if (listState.iterating === IteratingState.ITERATING) {
         updateIteratingState(IteratingState.NONE);
      }
   }, [listState, updateIteratingState, updateIteratingIndex]);

   const disabled = listState.iterating === IteratingState.DONE;
   const toggleText =
      listState.iterating === IteratingState.ITERATING ? "Pause" : "Start";

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
               disabled={disabled}
               color="info"
            >
               {toggleText}
            </Button>
            <Button
               size="medium"
               onClick={reset}
               variant="contained"
               color="info"
            >
               Reset
            </Button>
         </ButtonCont>
      </Container>
   );
};
