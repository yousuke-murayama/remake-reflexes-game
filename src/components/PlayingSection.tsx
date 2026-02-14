import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import {
  Difficulty,
  type PlusEffect,
  type Target,
} from "../types/sections.interface";
import { Box, Fade, styled, Typography } from "@mui/material";

interface Props {
  difficulty: Difficulty;
}

export const PlayingSection: FC<Props> = ({ difficulty }) => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [plusEffects, setPlusEffects] = useState<PlusEffect[]>([]);
  const [score, setScore] = useState(0);

  console.log(plusEffects);

  const interval = useMemo(() => {
    if (difficulty === Difficulty.Easy) {
      return 2000;
    }
    if (difficulty === Difficulty.Normal) {
      return 1500;
    }
    return 1000;
  }, [difficulty]);

  const handleClickTarget = useCallback(
    (targetId: number) => {
      const clickedTarget = targets.find((target) => target.id === targetId)!;

      setPlusEffects((prev) => [
        ...prev,
        {
          id: clickedTarget.id,
          position: {
            x: clickedTarget.position.x + 4,
            y: clickedTarget.position.y + 4,
          },
          visible: true,
        },
      ]);

      setScore((prev) => prev + 1);

      setTargets((prev) =>
        prev.map((target) =>
          target.id === targetId ? { ...target, visible: false } : target,
        ),
      );

      // NOTE: 1秒後にフェードアウトさせる
      setTimeout(() => {
        setPlusEffects((prev) =>
          prev.map((effect) =>
            effect.id === targetId ? { ...effect, visible: false } : effect,
          ),
        );
      }, 1000);

      setTimeout(() => {
        setPlusEffects((prev) =>
          prev.filter((effect) => effect.id !== targetId),
        );
      }, 2000);
    },
    [targets],
  );

  useEffect(() => {
    let created = 0;

    const timer = setInterval(() => {
      created += 1;
      setTargets((prev) => [
        ...prev.map((target) => ({ ...target, visible: false })),
        {
          id: created,
          position: {
            x: Math.floor(Math.random() * 96),
            y: Math.floor(Math.random() * 96),
          },
          size: Math.floor(Math.random() * 41) + 10,
          visible: true,
        },
      ]);
      if (created >= 20) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return (
    <>
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
            target.visible && (
              <Target
                key={target.id}
                onClick={() => handleClickTarget(target.id)}
                position={target.position}
                size={target.size}
              />
            ),
        )}
        {plusEffects.map((effect) => (
          <Fade
            key={effect.id}
            in={effect.visible}
            timeout={{
              enter: 1000,
              exit: 1000,
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                left: `${effect.position.x}%`,
                top: `${effect.position.y}%`,
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "#1a10da",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              +1
            </Typography>
          </Fade>
        ))}
      </Box>
    </>
  );
};

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
