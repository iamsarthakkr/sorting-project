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
   const { updateIteratingIndex } = useAppContextActions();
   const { list, listState } = context;
   const timerRef = React.useRef<NodeJS.Timeout | undefined>();

   React.useEffect(() => {
      if (timerRef.current) {
         clearTimeout(timerRef.current);
         timerRef.current = undefined;
      }
      if (!listState.iterating) {
         return;
      }

      timerRef.current = setTimeout(() => {
         const newIndex =
            listState.iteratingIndex === list.length
               ? 0
               : listState.iteratingIndex + 1;
         updateIteratingIndex(newIndex);
      }, 100);
   }, [
      list,
      listState.iterating,
      listState.iteratingIndex,
      updateIteratingIndex,
   ]);

   return (
      <Container>
         {list.map((cell) => {
            return <ListItem key={cell.index} element={cell} />;
         })}
      </Container>
   );
};
