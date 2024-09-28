import styled from "styled-components";
import { ICell } from "../../types";
import { useAppContext } from "../App/useAppContext";

const Item = styled.div<{
   height: number;
   $leftBorder: boolean;
   $rightBorder: boolean;
}>`
   width: 15px;
   height: ${(props) => `${props.height}px`};
   border-top: 1px solid black;
   border-left: ${(props) => (props.$leftBorder ? "1px solid black" : 0)};
   border-right: ${(props) => (props.$rightBorder ? "1px solid black" : 0)};

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

export const ListItem = (props: IListItem) => {
   const context = useAppContext();
   const { list, listState } = context;

   const { element } = props;
   const { index, value } = element;

   const hasLeft = index === 0 || list[index].value >= list[index - 1].value;
   const hasRight =
      index === list.length - 1 || list[index].value > list[index + 1].value;
   const iterating = listState.iteratingIndex === index;
   const cellClass = iterating ? "cell-iterating" : "cell";
   return (
      <Item
         className={cellClass}
         height={value}
         $leftBorder={hasLeft}
         $rightBorder={hasRight}
      />
   );
};
