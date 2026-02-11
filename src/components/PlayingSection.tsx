import type { FC } from "react";
import type { Difficulty } from "../types/sections.interface";
import { Box, styled } from "@mui/material";

interface Props {
  difficulty: Difficulty;
}

export const PlayingSection: FC<Props> = ({ difficulty }) => {
  return (
    <PlayingSectionContainer>
      <Box
        sx={{
          border: "1px solid black",
          width: "1280px",
          height: "700px",
        }}
      ></Box>
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
