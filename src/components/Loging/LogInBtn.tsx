"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";

type LoginBtnProps = {
  text: string;
  icon?: React.ReactNode;
  provider: string;
};

export function LoginBtn({ text, icon, provider }: LoginBtnProps) {

  const handleSign = () => {
    if(provider == "google") {
    signIn("google", { callbackUrl: "http://localhost:3000/in" });
    }else{
      signIn("facebook", { callbackUrl: "http://localhost:3000/in" });
    }
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
