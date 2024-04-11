import { OutlinedInput } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import XButton from "../shared/XButton";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Player } from "@/app/redux/features/game/type";
import { useDispatch } from "react-redux";
import { User, loginUser } from "@/app/redux/features/auth";

// Define interfaces

// Define validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  roomId: yup.string().required("Room ID is required"),
});

export default function LoginSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { roomId: "room-1" },
  });
  const dispatch = useDispatch();

  const onSubmit = (data: Partial<User>) => {
    dispatch(loginUser(data));

    console.log(data);
  };
  const watchedName = watch("name");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border-2  border-primaryBorder bg-background   p-4  align-middle transition-all`}
    >
      <h1 className="text-2xl font-bold">Welcome</h1>

      <OutlinedInput
        size="small"
        placeholder="Enter Name"
        className="w-full"
        error={Boolean(errors.name?.message)}
        {...register("name")}
      />
      <OutlinedInput
        size="small"
        placeholder="Room ID"
        className="w-full"
        error={Boolean(errors.roomId?.message)}
        {...register("roomId")}
      />
      <XButton
        disabled={!Boolean(watchedName)}
        variant="contained"
        type="submit"
        className="w-full"
      >
        Accept
      </XButton>
    </form>
  );
}
