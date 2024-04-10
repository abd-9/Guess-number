"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";
import { Button, Grid, Input, OutlinedInput } from "@mui/material";
import { FC } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Person3Icon from '@mui/icons-material/Person3';
import AddAlarmIcon from '@mui/icons-material/AddAlarm';
export default function ScoreBar() {
  return (
    <div
      className={` grid h-full w-full grid-flow-col grid-cols-3 flex-col items-center justify-center gap-6 align-middle transition-all`}
    >
      <StatisticItem value="1000" icon={<MilitaryTechIcon  className='text-white' fontSize='large'/>} title="Pints" />
      <StatisticItem value="Tomas" icon={<Person3Icon className='text-white' fontSize='large'/>} title="Pints" />
      <StatisticItem value="21:30" icon={<AddAlarmIcon className='text-white' fontSize='large'/>} title="Pints" />
    </div>
  );
}

interface IStatisticItem {
  value: string;
  icon?: React.ReactNode;
  iconUrl?: string;
  title: string;
}
const StatisticItem: FC<IStatisticItem> = ({
  value = "0",
  iconUrl,
  title,
  icon,
}) => {
  return (
    <div className="cols-col-span-1 relative h-full  flex flex-row items-center  rounded-xl align-middle bg-gradient-to-r from-black to-gray-500 ">
      {icon ?<div className="  absolute left-3 ">{icon}</div>: (
        <img
          src={iconUrl}
          alt={title}
          tw="w-20 h-20 mb-4 opacity-95 "
          className="absolute"
        />
      )}
      <span className="w-full text-center text-white">{value}</span>
    </div>
  );
};
