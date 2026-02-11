import { useCallback, useState, type ChangeEvent, type FC } from "react";
import { StartSection } from "./components/StartSection";
import { Difficulty } from "./types/sections.interface";

const App: FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);

  const handleChangeDifficulty = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDifficulty(Number(event.target.value) as Difficulty);
    },
    [],
  );

  return (
    <StartSection difficulty={difficulty} onChange={handleChangeDifficulty} />
  );
};

export default App;
