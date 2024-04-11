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
import { PlayerRound } from "@/app/redux/features/game/type";

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Eclair", 262, 16.0),
  createData("Eclair", 262, 16.0),
  createData("Cupcake", 305, 3.7),
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function ActiveRankSection({
  data,
  hideData,
}: {
  data: PlayerRound[];
  hideData: Boolean;
}) {
  return (
    <TableContainer
      sx={{ height: 200 }}
      component={Paper}
      className="  relative overflow-auto rounded-lg border-2 border-primaryBorder"
    >
      <Table size="small" stickyHeader className=" ">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Point</TableCell>
            <TableCell>Multiplier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow
              key={row.name + index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{hideData ? "-" : row.placedPoint}</TableCell>
              <TableCell>{hideData ? "-" : row.multiplier}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
