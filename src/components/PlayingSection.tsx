import { useEffect, useMemo, useState, type FC } from "react";
import { Difficulty, type Target } from "../types/sections.interface";
import { Box, styled } from "@mui/material";

interface Props {
  difficulty: Difficulty;
}

export const PlayingSection: FC<Props> = ({ difficulty }) => {
  const [targets, setTargets] = useState<Target[]>([]);

  const interval = useMemo(() => {
    if (difficulty === Difficulty.Easy) {
      return 1200;
    }
    if (difficulty === Difficulty.Normal) {
      return 1000;
    }
    return 750;
  }, [difficulty]);

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
              <Box
                key={target.id}
                sx={{
                  position: "absolute",
                  left: `${target.position.x}%`,
                  top: `${target.position.y}%`,
                  width: `${target.size}px`,
                  height: `${target.size}px`,
                  borderRadius: "50%",
                  backgroundColor: "black",
                  cursor: "pointer",
                }}
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
