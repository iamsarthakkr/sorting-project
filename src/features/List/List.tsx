import React from "react";
import styled from "styled-components";
import { useAppContext, useAppContextActions } from "../App/useAppContext";
import { ListItem } from "./ListItem";

const Container = styled.div`
   width: 90%;
   border: 2px solid black;
   height: 40vh;
   margin-top: 1em;
   display: flex;
   align-items: flex-end;
   justify-content: center;
`;

export const List = () => {
   const context = useAppContext();
   const { updateIteratingIndex } = useAppContextActions();
   const { list, listState } = context;

   React.useEffect(() => {
      setTimeout(() => {
         const newIndex =
            listState.iteratingIndex === list.length
               ? 0
               : listState.iteratingIndex + 1;
         updateIteratingIndex(newIndex);
      }, 100);
   }, [list, listState.iteratingIndex, updateIteratingIndex]);

   return (
      <Container>
         {list.map((cell) => {
            return <ListItem key={cell.index} element={cell} />;
         })}
      </Container>
   );
};
