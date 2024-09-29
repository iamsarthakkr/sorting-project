import styled from "styled-components";
import { ICell } from "../../types";
import { useAppContext } from "../App/useAppContext";

const Item = styled.div<{
   height: number;
   $leftBorder: boolean;
   $rightBorder: boolean;
}>`
   width: 5px;
   height: ${(props) => `${props.height}px`};
   border-top: 1px solid black;
   border-left: ${(props) => (props.$leftBorder ? "1px solid black" : 0)};
   border-right: ${(props) => (props.$rightBorder ? "1px solid black" : 0)};

   &.cell-visited {
      background-color: var(--cell-color-visited);
   }

   &.cell {
      background-color: var(--cell-color);
   }

   &.cell-iterating {
      background-color: var(--cell-color-iterating);
   }
`;

type IListItem = {
   element: ICell;
};

const inRange = (start: number, end: number, index: number) =>
   start <= index && index < end;

export const ListItem = (props: IListItem) => {
   const context = useAppContext();
   const { list, listState } = context;

   const { element } = props;
   const { index, value } = element;

   const hasLeft = index === 0 || list[index].value >= list[index - 1].value;
   const hasRight =
      index === list.length - 1 || list[index].value > list[index + 1].value;
   const iteratingCurr = listState.iteratingIndex === index;
   const cellClass = iteratingCurr
      ? "cell-iterating"
      : inRange(listState.startIndex, listState.endIndex, index)
      ? "cell"
      : "cell-visited";
   return (
      <Item
         className={cellClass}
         height={value}
         $leftBorder={hasLeft}
         $rightBorder={hasRight}
      />
   );
};
