import { useCallback, useState, type ChangeEvent, type FC } from "react";
import { StartSection } from "./components/StartSection";
import { Difficulty } from "./types/sections.interface";
import { GlobalStyles, styled } from "@mui/material";

const App: FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);

  const handleChangeDifficulty = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDifficulty(Number(event.target.value) as Difficulty);
    },
    [],
  );

  return (
    <>
      <GlobalStyles
        styles={{
          "*": {
            padding: 0,
            margin: 0,
          },
        }}
      />
      <StyledMain>
        <StartSection
          difficulty={difficulty}
          onChange={handleChangeDifficulty}
        />
      </StyledMain>
    </>
  );
};

const StyledMain = styled("main")({
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

export default App;
