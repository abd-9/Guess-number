import * as React from "react";
import Slider, {
  SliderProps,
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

interface PrettoSliderProps extends SliderProps {
  color?: string;
}

const PrettoSlider = styled(Slider)({
  color: "white",

  height: 4,
  "& .MuiSlider-track": {
    border: "none",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    // backgroundColor: "#fff",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",

    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: " #FF8E53",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export const XSlider: React.FC<PrettoSliderProps> = ({
  color,
  ...sliderProps
}) => {
  return (
    <PrettoSlider
      {...sliderProps}
      valueLabelDisplay="auto"
      aria-label="pretto slider"
      defaultValue={20}
    />
  );
};
