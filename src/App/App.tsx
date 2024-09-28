import React from "react";
import styled from "styled-components";
import { Center } from "../components";

const AppContainer = styled(Center)`
   font-weight: 500;
   font-size: 1.4em;
`;

export const App = () => {
   return <AppContainer>Hello World</AppContainer>;
};
