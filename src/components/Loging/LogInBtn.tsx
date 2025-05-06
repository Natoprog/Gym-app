"use client";
import React from "react";
import { LoginAction } from "../../app/serverActions/LoginAction";

type LoginBtnProps = {
  text: string;
  icon?: React.ReactNode;
  provider: string;
};

export function LoginBtn({ text, icon }: LoginBtnProps) {
  return (
    <form action={LoginAction}>
      <button className="p-2 rounded-md bg-teal-600 text-white flex justify-center items-center gap-1 min-w-min w-full hover:bg-teal-700 transition duration-200 ease-in-out cursor-pointer">
        {icon}
        {text}
      </button>
    </form>
  );
}
