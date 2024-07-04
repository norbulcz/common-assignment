import { useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import FixedUniversalContainer from "./components/FixedUniversalContainer";
import GlobalStyle from "./styles/globalStyles";
import { theme } from "./styles/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  gap: 20px;
`;

const GenericInfoContainer = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  font-size: 80px;
  display: flex;
  justify-content: center;  
  align-items: center;
`;

const App: React.FC = () => {

  const expanderRef = useRef<HTMLDivElement>(null);
  const expandedContent = (
    <div>
      <h1>It's overlapping!</h1>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <GenericInfoContainer>
          1
        </GenericInfoContainer>
        <GenericInfoContainer>
          2
        </GenericInfoContainer>
        <GenericInfoContainer>
          3
        </GenericInfoContainer>
        <GenericInfoContainer>
          4
        </GenericInfoContainer>
        <GenericInfoContainer ref={expanderRef}>
          5
        </GenericInfoContainer>
        <GenericInfoContainer>
          6
        </GenericInfoContainer>
        <GenericInfoContainer>
          7
        </GenericInfoContainer>
        <GenericInfoContainer>
          8
        </GenericInfoContainer>
        <GenericInfoContainer>
          9
        </GenericInfoContainer>
      </Container>
      <FixedUniversalContainer
        overlappingComponentRef={expanderRef}
        content={expandedContent}
      />
    </ThemeProvider>
  )
}

export default App
