"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";
import {
  Button,
  Grid,
  Input,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

import { FC } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Person3Icon from "@mui/icons-material/Person3";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import { PlayerRound } from "@/app/redux/features/game/type";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/app/redux/hooks";
function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function RankSection({
  hideData,
}: {
  data: PlayerRound[];
  hideData: Boolean;
}) {
  const data = useAppSelector((state) => state.gameReducer.players);
  return (
    <TableContainer
      sx={{ maxHeight: 180 }}
      component={Paper}
      className="no-scrollbar"
    >
      <Table size="small" stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NO.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow
              key={row.name + index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{hideData ? "-" : row.points}</TableCell>
              {/* <TableCell>{hideData ? "-" : row.multiplier}</TableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
