import React from "react";
import styled from "styled-components";
import { List } from "../List";
import { Flex } from "../../components";
import { AppContextProvider } from "./AppContextProvider";
import { Header } from "../Header";
import { AlgorithmController } from "../Algorithms";

const AppContainer = styled(Flex)`
   min-height: 100vh;
   min-width: 100vw;
   font-weight: 500;
   font-size: 18px;
   flex-direction: column;
   align-items: center;
`;

export const App = () => {
   return (
      <AppContextProvider>
         <AppContainer>
            <Header />
            <List />
            <AlgorithmController />
         </AppContainer>
      </AppContextProvider>
   );
};
