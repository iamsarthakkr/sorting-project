import styled from "styled-components";
import { ICell } from "../../types";
import { useAppContext } from "../App/useAppContext";

const Container = styled.div<{
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

type IListItem = {
   element: ICell;
};

export const ListItem = (props: IListItem) => {
   const context = useAppContext();
   const { list } = context;

   const { element } = props;
   const { index, value } = element;

   const hasLeft = index === 0 || list[index].value >= list[index - 1].value;
   const hasRight =
      index === list.length - 1 || list[index].value > list[index + 1].value;
   return (
      <Container height={value} $leftBorder={hasLeft} $rightBorder={hasRight} />
   );
};
