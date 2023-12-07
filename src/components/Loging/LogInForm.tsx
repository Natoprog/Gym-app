import React from "react";
import { LoginBtn } from "./LogInBtn";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function LogInForm() {
  return (
    <div className="flex gap-2 flex-col bg-slate-700 p-8 rounded-md min-h-min h-[300px] justify-center">
        <h4 className="text-white mb-5">Login:</h4>
        <LoginBtn text="Zaloguj się przez Google!" icon={<AiFillGoogleCircle/>} provider="google"/>
    </div>
  );
}