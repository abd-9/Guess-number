"use client";

import {
  Box,
  Button,
  Chip,
  Grid,
  Input,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { FC } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

export default function ChatSection() {
  return (
    <div className={`  flex  h-full w-full flex-col justify-start `}>
      <div
        className="chat-list flex-grow-1 relative my-2 overflow-auto px-2"
        style={{ flexGrow: "1" }}
      >
        <div className="absolute ">
          <StatisticItem sender="Jack" message={" hey there"} />
          <StatisticItem sender="Tomas" message={"Hi Jack "} />
          <StatisticItem sender="Tomas" message={"Hi Jack "} />
          <StatisticItem sender="Tomas" message={"Hi Jack "} />
          <StatisticItem sender="Tomas" message={"Hi Jack "} />
          <StatisticItem sender="Tomas" message={"Hi Jack "} />
          <StatisticItem sender="Tomas" message={"Hi Jack "} />
          <StatisticItem sender="Tomas" message={"Hi Jack "} />
        </div>
      </div>
      <div
        className=" flex flex-row  gap-2 bg-gray-600  p-2"
        style={{ flexGrow: "0" }}
      >
        <TextField size="small" fullWidth label="fullWidth" id="fullWidth" />
        <Button size="small" variant="contained" color="primary">
          Send
        </Button>
      </div>
    </div>
  );
}

interface IChatItemProps {
  message: string;
  sender: string;
}
const StatisticItem: FC<IChatItemProps> = ({ message, sender }) => {
  return (
    <div className=" grid   grid-cols-6 items-center   ">
      <div className="cols-col-span-2 "> {sender} </div>
      <Box className="cols-col-span-4 " sx={{ width: 100 }}>
        <Chip
          sx={{
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
          }}
          label={message}
        />
      </Box>
    </div>
  );
};
