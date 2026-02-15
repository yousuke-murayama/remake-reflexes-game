import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
} from "react";
import { StartSection } from "./components/StartSection";
import { Difficulty } from "./types/sections.interface";
import { GlobalStyles, styled } from "@mui/material";
import { PlayingSection } from "./components/PlayingSection";

const App: FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [countDown, setCountDown] = useState(3);

  const handleClickStartButton = useCallback(() => setIsGameStarted(true), []);

  const handleChangeDifficulty = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDifficulty(Number(event.target.value) as Difficulty);
    },
    [],
  );

  const handleClickRetryButton = useCallback(() => setCountDown(3), []);

  useEffect(() => {
    if (!isGameStarted || countDown < 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [countDown, isGameStarted]);

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
        <SectionContainer>
          {isGameStarted ? (
            <PlayingSection
              difficulty={difficulty}
              countDown={countDown}
              onClick={handleClickRetryButton}
            />
          ) : (
            <StartSection
              difficulty={difficulty}
              onChange={handleChangeDifficulty}
              onClick={handleClickStartButton}
            />
          )}
        </SectionContainer>
      </StyledMain>
    </>
  );
};

const StyledMain = styled("main")({
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const SectionContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export default App;
