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
      <button className="p-2 rounded-md bg-teal-600 text-white flex justify-start items-center gap-1 min-w-min w-[250px]">
        {icon}
        {text}
      </button>
    </form>
  );
}
