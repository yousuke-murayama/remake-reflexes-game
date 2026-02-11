import { useCallback, useState, type ChangeEvent, type FC } from "react";
import { StartSection } from "./components/StartSection";
import { Difficulty } from "./types/sections.interface";
import { GlobalStyles, styled } from "@mui/material";
import { PlayingSection } from "./components/PlayingSection";

const App: FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleClickStartButton = useCallback(() => setIsGameStarted(true), []);

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
        {isGameStarted ? (
          <PlayingSection difficulty={difficulty} />
        ) : (
          <StartSection
            difficulty={difficulty}
            onChange={handleChangeDifficulty}
            onClick={handleClickStartButton}
          />
        )}
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
