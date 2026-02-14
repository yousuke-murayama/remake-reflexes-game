import type { ChangeEvent, FC } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Difficulty } from "../types/sections.interface";

interface Props {
  difficulty: Difficulty;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

export const StartSection: FC<Props> = ({ difficulty, onChange, onClick }) => {
  return (
    <Stack flexDirection="column" spacing={3}>
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
        size="medium"
        sx={{ alignSelf: "center" }}
        onClick={onClick}
      >
        START
      </Button>

      <FormControl>
        <Typography sx={{ fontSize: "1.5rem", mb: 1, textAlign: "center" }}>
          ～難易度を選択してください～
        </Typography>
        <RadioGroup
          row
          value={difficulty.toString()}
          onChange={onChange}
          sx={{ justifyContent: "center" }}
        >
          <FormControlLabel
            value={Difficulty.Easy.toString()}
            control={<Radio size="small" />}
            label={<Typography sx={{ fontSize: "1.5rem" }}>EASY</Typography>}
          />
          <FormControlLabel
            value={Difficulty.Normal.toString()}
            control={<Radio size="small" />}
            label={<Typography sx={{ fontSize: "1.5rem" }}>NORMAL</Typography>}
          />
          <FormControlLabel
            value={Difficulty.Hard.toString()}
            control={<Radio size="small" />}
            label={<Typography sx={{ fontSize: "1.5rem" }}>HARD</Typography>}
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};
