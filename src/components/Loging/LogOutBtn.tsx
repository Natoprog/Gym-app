"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function LoginBtn() {
  const handleSignOut = () => {
    signOut();
  };

  return (
    <button
      className="p-2 rounded-md bg-teal-600 text-white flex justify-start items-center gap-1 cursor-pointer"
      onClick={handleSignOut}
    >
      Wyloguj się!
    </button>
  );
}
