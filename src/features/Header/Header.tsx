import React from "react";
import styled from "styled-components";
import { Flex } from "../../components";
import { Button } from "semantic-ui-react";
import { useAppContext, useAppContextActions } from "../App/useAppContext";

const Container = styled(Flex)`
   width: 90%;
   height: 70px;
   margin-top: 10px;
   align-items: center;
   flex-direction: row;
   justify-content: space-around;
`;

export const Header = () => {
   const { listState } = useAppContext();
   const { toggleIteratingState, resetListState } = useAppContextActions();

   return (
      <Container>
         <div>Left</div>
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
