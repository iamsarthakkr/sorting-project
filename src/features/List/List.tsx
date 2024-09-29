import React from "react";
import styled from "styled-components";
import { useAppContext, useAppContextActions } from "../App/useAppContext";
import { ListItem } from "./ListItem";

const Container = styled.div`
   width: 90%;
   background-color: var(--bg-light-2);
   border: 1px solid var(--text-dark-1);
   height: 40vh;
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
