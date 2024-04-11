"use client";

import { Session } from "next-auth";
import { Button, Grid, Input, OutlinedInput } from "@mui/material";

export default function LoginSection({ session }: { session: Session | null }) {
  // const scrolled = useScroll(50);
  return (
    <div
      className={` flex h-full w-full flex-col items-center justify-center gap-3 align-middle transition-all`}
    >
      <h2>Welcome</h2>
      <OutlinedInput size="small" className="w-full"></OutlinedInput>
      <Button variant="contained" color="secondary" className="w-full">
        Accept{" "}
      </Button>
    </div>
  );
}
