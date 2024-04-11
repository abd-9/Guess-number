"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";
import { Button, Grid, Input, OutlinedInput } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import Person3Icon from "@mui/icons-material/Person3";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

export default function ScoreBar() {
  const userData = useAppSelector((state: RootState) => state.userReducer);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  let intervalId = useRef({});
  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(intervalId.current);
  }, []);

  return (
    <div
      className={` grid h-full w-full grid-flow-col grid-cols-3 flex-col items-center justify-center gap-6 align-middle `}
    >
      <StatisticItem
        value={
          userData.currentUser.isLoggedIn
            ? userData.currentUser?.points?.toString()
            : "-"
        }
        icon={<MilitaryTechIcon className="text-white" fontSize="large" />}
        title="Pints"
      />
      <StatisticItem
        value={
          userData.currentUser.isLoggedIn ? userData.currentUser.name : "-"
        }
        icon={<Person3Icon className="text-white" fontSize="large" />}
        title="Pints"
      />
      <StatisticItem
        value={currentTime.toString()}
        icon={<AddAlarmIcon className="text-white" fontSize="large" />}
        title="Pints"
      />
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
    <div className="cols-col-span-1 relative flex  h-full flex-row items-center  rounded-xl bg-gradient-to-r from-[#171b24] to-[#232937] align-middle ">
      {icon ? (
        <div className="absolute left-3 ">{icon}</div>
      ) : (
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

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
