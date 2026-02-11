import type { ChangeEvent, FC } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Difficulty } from "../types/sections.interface";

interface Props {
  difficulty: Difficulty;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const StartSection: FC<Props> = ({ difficulty, onChange }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#efefef",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Typography
        component="h1"
        sx={{
          color: "#31c53b",
          fontSize: { xs: "3rem", sm: "5rem" },
          fontWeight: 700,
          letterSpacing: "0.02em",
          lineHeight: 1,
        }}
      >
        反射神経ゲーム
      </Typography>

      <Button
        variant="outlined"
        sx={{
          width: 260,
          height: 80,
          borderColor: "#666",
          color: "#111",
          fontSize: "2rem",
          fontWeight: 400,
          borderRadius: 0,
          textTransform: "none",
          "&:hover": {
            borderColor: "#444",
            backgroundColor: "transparent",
          },
        }}
      >
        START
      </Button>

      <FormControl>
        <Typography sx={{ fontSize: "2rem", mb: 1 }}>
          ～難易度を選択してください～
        </Typography>
        <RadioGroup row value={difficulty.toString()} onChange={onChange}>
          <FormControlLabel
            value={Difficulty.Easy.toString()}
            control={<Radio size="small" />}
            label={<Typography sx={{ fontSize: "2rem" }}>EASY</Typography>}
          />
          <FormControlLabel
            value={Difficulty.Normal.toString()}
            control={<Radio size="small" />}
            label={<Typography sx={{ fontSize: "2rem" }}>NORMAL</Typography>}
          />
          <FormControlLabel
            value={Difficulty.Hard.toString()}
            control={<Radio size="small" />}
            label={<Typography sx={{ fontSize: "2rem" }}>HARD</Typography>}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
