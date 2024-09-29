import React from "react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { Flex } from "../../components";
import { useAppContext, useAppContextActions } from "../App/useAppContext";
import { Select } from "../../components/Select";
import { Algorithms } from "../../Constants";
import { Algorithm } from "../../types";

const Container = styled(Flex)`
   width: 90%;
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

export const Header = () => {
   const { listState, algorithm } = useAppContext();
   const { toggleIteratingState, resetListState, setAlgorithm } =
      useAppContextActions();

   const updateAlgo = React.useCallback(
      (val: string) => {
         setAlgorithm(val as Algorithm);
      },
      [setAlgorithm]
   );

   return (
      <Container>
         <SelectCont>
            <Select
               value={algorithm}
               options={Algorithms}
               onChange={updateAlgo}
            />
         </SelectCont>
         <div>
            <Button size="large" onClick={toggleIteratingState} color="teal">
               {listState.iterating ? "Pause" : "Start"}
            </Button>
            <Button size="large" onClick={resetListState} color="teal">
               Reset
            </Button>
         </div>
      </Container>
   );
};
