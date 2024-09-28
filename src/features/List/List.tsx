import React from "react";
import styled from "styled-components";
import { useAppContext } from "../App/useAppContext";
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
   const { list } = context;

   return (
      <Container>
         {list.map((cell) => {
            return <ListItem key={cell.index} element={cell} />;
         })}
      </Container>
   );
};
