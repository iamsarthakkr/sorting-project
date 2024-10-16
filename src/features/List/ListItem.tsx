import React from "react";
import styled from "styled-components";
import { ICell } from "../../types";
import { useAppContext } from "../App/useAppContext";

const Item = styled.div<{
   height: number;
   $leftBorder: boolean;
   $rightBorder: boolean;
}>`
   min-width: 10px;
   width: 10px;
   height: ${(props) => `${props.height}px`};
   border-top: 1px solid black;
   border-left: ${(props) => (props.$leftBorder ? "0.5px solid black" : 0)};
   border-right: ${(props) => (props.$rightBorder ? "0.5px solid black" : 0)};

   &.cell,
   &.cell-active {
      background-color: var(--cell-color-active);
   }

   &.cell-inactive {
      background-color: var(--cell-color-inactive);
   }

   &.cell-iterating {
      background-color: var(--cell-color-iterating);
   }

   &.cell-swapping {
      background-color: var(--cell-color-swapping);
   }
`;

type IListItem = {
   element: ICell;
};

const inRange = (start: number, end: number, index: number) => {
   return start <= index && index < end;
};

export const ListItem = (props: IListItem) => {
   const context = useAppContext();
   const { list, algorithmState } = context;

   const { element } = props;
   const { index, value } = element;

   const hasLeft = index === 0 || list[index].value >= list[index - 1].value;
   const hasRight =
      index === list.length - 1 || list[index].value > list[index + 1].value;

   const getActiveClass = React.useCallback(() => {
      const { iteratingRange } = algorithmState;
      if (iteratingRange.length === 0) {
         return "";
      }
      const start = iteratingRange[0],
         end = iteratingRange[1];
      return inRange(start, end, index) ? "cell-active" : "cell-inactive";
   }, [algorithmState, index]);

   const getSwappingClass = React.useCallback(() => {
      const { swappingIndices } = algorithmState;
      return swappingIndices.indexOf(index) !== -1 ? "cell-swapping" : "";
   }, [algorithmState, index]);

   const getIteratingClass = React.useCallback(() => {
      const { iteratingIndices } = algorithmState;
      return iteratingIndices.indexOf(index) !== -1 ? "cell-iterating" : "";
   }, [algorithmState, index]);

   const cellClasses = React.useMemo(() => {
      const classes: Array<string> = ["cell"];
      const activeClass = getActiveClass();
      if (activeClass) {
         classes.push(activeClass);
      }
      const iteratingClass = getIteratingClass();
      if (iteratingClass) {
         classes.push(iteratingClass);
      }
      const swappingClass = getSwappingClass();
      if (swappingClass) {
         classes.push(swappingClass);
      }

      return classes.join(" ");
   }, [getActiveClass, getIteratingClass, getSwappingClass]);

   return (
      <Item
         className={cellClasses}
         height={value}
         $leftBorder={hasLeft}
         $rightBorder={hasRight}
      />
   );
};
