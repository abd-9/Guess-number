"use client";

import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import { FC, useEffect, useState } from "react";
import { MenuIcon, SearchIcon } from "lucide-react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import XButton from "@/components/shared/XButton";
import ActiveRankSection from "./rank";
import { XSlider } from "@/components/shared/XSlider";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import CastleIcon from "@mui/icons-material/Castle";
import {
  endRound,
  joinGame,
  joinRound,
  selectPlayerInGameById,
  setPlayerGuessValue,
  setSpeed,
  startRound,
  updatePlayerPoints,
  updateRoundStatus,
} from "@/app/redux/features/game/gameSlice";
import { useSelector } from "react-redux";
import { PlayerRound } from "../../../app/redux/features/game/type";

interface RoundGuess {
  multipier?: number;
  points?: number;
}
export default function ActiveRoundSection() {
  // const scrolled = useScroll(50);
  const dispatch = useAppDispatch();
  const currentGame = useAppSelector((state) => state.gameReducer);
  const currentPlayer = useAppSelector((state) => state.userReducer);
  const selectedPlayer = useAppSelector((state) =>
    selectPlayerInGameById(state, currentPlayer.currentUser?.id!!),
  );

  const handleJoinRound = () => {
    const palyer: PlayerRound = {
      ...currentPlayer.currentUser,
      multiplier: currentRoundValue.multipier!!,
      placedPoint: currentRoundValue.points!!,
      points: 0,
    };
    dispatch(joinRound(palyer));
  };
  const startNewRound = () => {
    dispatch(startRound());
    const palyer: PlayerRound = {
      ...currentPlayer.currentUser,
      multiplier: 0,
      placedPoint: 0,
    };
    dispatch(joinGame(palyer));
    handleJoinRound();
  };

  useEffect(() => {
    startNewRound();

    return () => {};
  }, []);

  const [currentRoundValue, setCurrentRoundValue] = useState<RoundGuess>({
    multipier: 1,
    points: 1,
  });

  function updateCurrentPlayerRoundValue({ points, multipier }: RoundGuess) {
    if (currentPlayer.currentUser?.id)
      if (points != undefined) {
        if (points <= currentPlayer.currentUser.points!! && points > 0) {
          setCurrentRoundValue((_old) => ({ ..._old, points: points }));
          dispatch(
            setPlayerGuessValue({
              palyerId: currentPlayer.currentUser.id,
              placedValue: points,
            }),
          );
        }
      } else {
        if (multipier && (multipier < 0 || multipier > 10)) return;
        setCurrentRoundValue((_old) => ({ ..._old, multipier: multipier }));
        dispatch(
          setPlayerGuessValue({
            palyerId: currentPlayer.currentUser.id,
            multipier: multipier,
          }),
        );
      }
  }
  const onRoundStart = () => {
    dispatch(startRound());
    handleJoinRound();
  };
  const handleRoundEnd = () => {
    // means calc point and show it to user
    dispatch(endRound());
    // dispatch(updatePlayerPoints());
  };

  return (
    <div
      className={` flex h-full w-full flex-col items-start justify-start gap-3 `}
    >
      <div
        id="controler-section"
        className={`row-span-1 grid w-auto grid-flow-col gap-3  `}
      >
        <StatisticItem
          value={currentRoundValue?.points || 0}
          onChange={(_val) => {
            updateCurrentPlayerRoundValue({ points: _val });
          }}
          title="Pints"
        />
        <StatisticItem
          value={currentRoundValue?.multipier || 0}
          title="Placed"
          onChange={(_val: number): void => {
            console.log("_val_val", _val);
            updateCurrentPlayerRoundValue({ multipier: _val });
          }}
        />
      </div>
      {currentGame.currentRound.status == "Ready" ? (
        <XButton
          className="primary-button w-full"
          variant="contained"
          color="primary"
          onClick={() => {
            handleRoundEnd();
          }}
        >
          Start
        </XButton>
      ) : (
        <XButton
          className="primary-button w-full"
          variant="contained"
          color="primary"
          onClick={() => {
            onRoundStart();
          }}
        >
          Start Again{" "}
        </XButton>
      )}
      <h4 className="font-bold">
        <CastleIcon fontSize="small" /> Current Round
      </h4>
      <ActiveRankSection
        data={currentGame.currentRound.players}
        hideData={currentGame.currentRound.status == "Ready"}
      />
      <h4 className="font-bold">
        <ShutterSpeedIcon fontSize="small" /> Speed
      </h4>
      <SpeedSlider
        min={1}
        max={5}
        step={1}
        defaultValue={currentGame.speed}
        onChange={(_, _va) => {
          if (typeof _va == "number") dispatch(setSpeed(_va));
        }}
      />
    </div>
  );
}

interface IContainerControl {
  value: number;
  title: string;
  onChange: (value: number) => void;
}
const StatisticItem: FC<IContainerControl> = ({
  value = 0,
  title,
  onChange,
}) => {
  return (
    <Paper
      className="cols-col-span-1  relative flex  flex-col items-center  rounded-xl border-2 border-primaryBorder bg-gradient-to-r  from-[#171b24]  to-[#232937] align-middle "
      component="form"
    >
      <Box>
        <Typography className="text-xs">{title}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          onClick={() => {
            onChange(value - 1);
          }}
          size="small"
          type="button"
          aria-label="search"
        >
          <KeyboardArrowDownIcon fontSize="small" />
        </IconButton>
        <TextField
          InputProps={{ disableUnderline: true }}
          // label={title}
          inputProps={{
            style: {
              textAlign: "center",
              paddingTop: "1px",
              paddingBottom: "1px",
            },
          }}
          hiddenLabel
          type="tel"
          onChange={(_e) => {
            onChange(Number(_e.target.value));
          }}
          value={value}
          id="filled-hidden-label-small"
          defaultValue="10"
          variant="filled"
          size="small"
          className=""
        />

        <IconButton
          onClick={() => {
            onChange(value + 1);
          }}
          size="small"
          type="button"
          aria-label="search"
        >
          <KeyboardArrowUpIcon fontSize="small" />
        </IconButton>
      </Box>
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
  const handleChange = (event: React.ChangeEvent<{}>, value: number): void => {
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
        value={defaultValue}
        onChange={handleChange}
      />
      <Box className="grid w-full grid-cols-5 gap-10 text-center">
        <span key="1" className="text-sm">
          1x
        </span>
        <span key="12awd3sa45" className="text-sm">
          2x
        </span>
        <span key="1d2asd345" className="text-sm">
          3x
        </span>
        <span key="1as234d5" className="text-sm">
          4x
        </span>
        <span key="12asd3d45" className="text-sm">
          5x
        </span>
      </Box>
    </div>
  );
};
