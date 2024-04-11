"use client";

import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import { FC } from "react";
import { MenuIcon, SearchIcon } from "lucide-react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import XButton from "@/components/shared/XButton";
import ActiveRankSection from "./rank";
import { XSlider } from "@/components/shared/XSlider";
export default function ActiveRoundSection() {
  // const scrolled = useScroll(50);
  return (
    <div
      className={` flex h-full w-full flex-col items-start justify-start gap-3 `}
    >
      <div
        id="controler-section"
        className={` row-span-1 grid w-auto grid-flow-col gap-3  `}
      >
        <StatisticItem value="" title="Pints" name="points" />
        <StatisticItem value="" title="Pints" name="points" />
      </div>
      <XButton
        className="primary-button w-full"
        variant="contained"
        color="primary"
      >
        Start{" "}
      </XButton>
      <ActiveRankSection />
      <h4 className="font-bold">
        <ShutterSpeedIcon fontSize="small" /> Speed
      </h4>
      <SpeedSlider
        min={1}
        max={5}
        step={1}
        defaultValue={1}
        onChange={() => {}}
      />
    </div>
  );
}

interface IContainerControl {
  value: string;
  title: string;
  name: string;
}
const StatisticItem: FC<IContainerControl> = ({ value = "", title, name }) => {
  return (
    <Paper
      className="cols-col-span-1  flex  flex-row items-center  rounded-xl border-2 border-primaryBorder bg-gradient-to-r  from-[#171b24]  to-[#232937] align-middle "
      component="form"
      sx={{ display: "flex", alignItems: "center" }}
    >
      <IconButton size="small" type="button" aria-label="search">
        <KeyboardArrowUpIcon fontSize="small" />
      </IconButton>
      <TextField
        InputProps={{ disableUnderline: true }}
        inputProps={{ style: { textAlign: "center" } }}
        hiddenLabel
        id="filled-hidden-label-small"
        defaultValue="10"
        variant="filled"
        size="small"
        className=""
      />
      <IconButton size="small" type="button" aria-label="search">
        <KeyboardArrowDownIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
};

interface SpeedSliderProps {
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  onChange: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
}

const SpeedSlider: React.FC<SpeedSliderProps> = ({
  min,
  max,
  step,
  defaultValue,
  onChange,
}) => {
  const handleChange = (
    event: React.ChangeEvent<{}>,
    value: number | number[],
  ) => {
    if (typeof value === "number") {
      onChange(event, value);
    }
  };
  return (
    <div className="w-full rounded-xl border-2 border-primaryBorder bg-background px-4 pt-2">
      <XSlider
        className="pb-0 pt-1"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
      <Box className="grid w-full grid-cols-5 gap-10 text-center">
        <span className="text-sm">1x</span>
        <span className="text-sm">2x</span>
        <span className="text-sm">3x</span>
        <span className="text-sm">4x</span>
        <span className="text-sm">5x</span>
      </Box>
    </div>
  );
};
