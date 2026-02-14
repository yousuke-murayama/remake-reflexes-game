import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { Difficulty, type Target } from "../types/sections.interface";
import { Box, styled } from "@mui/material";

interface Props {
  difficulty: Difficulty;
}

export const PlayingSection: FC<Props> = ({ difficulty }) => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);

  const interval = useMemo(() => {
    if (difficulty === Difficulty.Easy) {
      return 3000;
    }
    if (difficulty === Difficulty.Normal) {
      return 1000;
    }
    return 750;
  }, [difficulty]);

  const handleClickTarget = useCallback((targetId: number) => {
    setScore((prev) => prev + 1);
    setTargets((prev) =>
      prev.map((target) =>
        target.id === targetId ? { ...target, isDisplay: false } : target,
      ),
    );
  }, []);

  useEffect(() => {
    let created = 0;

    const timer = setInterval(() => {
      created += 1;
      setTargets((prev) => [
        ...prev.map((target) => ({ ...target, isDisplay: false })),
        {
          id: created,
          position: {
            x: Math.floor(Math.random() * 96),
            y: Math.floor(Math.random() * 96),
          },
          size: Math.floor(Math.random() * 41) + 10,
          isDisplay: true,
        },
      ]);
      if (created >= 20) {
        window.clearInterval(timer);
      }
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval]);

  return (
    <PlayingSectionContainer>
      <p>現在の得点：{score}</p>
      <Box
        sx={{
          border: "1px solid black",
          width: "1280px",
          height: "700px",
          position: "relative",
        }}
      >
        {targets.map(
          (target) =>
            target.isDisplay && (
              <Target
                key={target.id}
                onClick={() => handleClickTarget(target.id)}
                position={target.position}
                size={target.size}
              />
            ),
        )}
      </Box>
    </PlayingSectionContainer>
  );
};

const PlayingSectionContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

const Target = styled("div", {
  shouldForwardProp: (props) => props !== "position" && props !== "size",
})<Pick<Target, "position" | "size">>(({ position, size }) => ({
  position: "absolute",
  left: `${position.x}%`,
  top: `${position.y}%`,
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: "50%",
  backgroundColor: "black",
  cursor: "pointer",
}));
