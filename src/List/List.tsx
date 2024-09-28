import React from "react";
import styled from "styled-components";
import { randomArray } from "../Utils";

const Container = styled.div`
   width: 90%;
   border: 2px solid black;
   height: 40vh;
   margin-top: 1em;
   display: flex;
   align-items: flex-end;
   justify-content: center;
`;

const ListElement = styled.div<{
   height: number;
   $leftBorder: boolean;
   $rightBorder: boolean;
}>`
   width: 15px;
   height: ${(props) => `${props.height}px`};
   border-top: 1px solid black;
   border-left: ${(props) => (props.$leftBorder ? "1px solid black" : 0)};
   border-right: ${(props) => (props.$rightBorder ? "1px solid black" : 0)};
   background-color: #e8e869;
`;

export const List = () => {
   const [values, setValues] = React.useState<number[]>(randomArray(40));
   console.log(values);

   return (
      <Container>
         {values.map((val, index) => {
            const hasLeft = index === 0 || values[index] >= values[index - 1];
            const hasRight =
               index === values.length - 1 || values[index] > values[index + 1];
            return (
               <ListElement
                  key={index}
                  height={val}
                  $leftBorder={hasLeft}
                  $rightBorder={hasRight}
               />
            );
         })}
      </Container>
   );
};
