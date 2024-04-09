"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { Session } from "next-auth";
import { Button, Grid, Input, OutlinedInput } from "@mui/material";

export default function LoginSection({ session }: { session: Session | null }) {
  // const scrolled = useScroll(50);
  return (
    <div
      className={` flex h-full w-full flex-col items-center justify-center gap-3 align-middle transition-all`}
    >
      <h2>Welcome</h2>
      <OutlinedInput className="w-full"></OutlinedInput>
      <Button variant="contained" color="primary" className="w-full">
        Accept{" "}
      </Button>
    </div>
  );
}
