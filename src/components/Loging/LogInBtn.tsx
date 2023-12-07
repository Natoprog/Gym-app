"use client";
import { signIn } from "@/auth";
import React from "react";

type LoginBtnProps = {
  text: string;
  icon?: React.ReactNode;
  provider: string;
};

export function LoginBtn({ text, icon, provider }: LoginBtnProps) {
  const handleSign = async () => {
    await signIn("google", { callbackUrl: "http://localhost:3000/in" });
  };

  return (
    <button
      className="p-2 rounded-md bg-teal-600 text-white flex justify-start items-center gap-1 min-w-min w-[250px]"
      onClick={handleSign}
    >
      {icon}
      {text}
    </button>
  );
}
