import React from "react";
import styled from "styled-components";
import { List } from "../List";
import { FlexCenter } from "../components";

const AppContainer = styled(FlexCenter)`
   min-height: 100vh;
   min-width: 100vw;
   font-weight: 500;
   font-size: 1.4em;
`;

export const App = () => {
   return (
      <AppContainer>
         <List />
      </AppContainer>
   );
};
