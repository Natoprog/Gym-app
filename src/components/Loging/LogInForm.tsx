import React from "react";
import { LoginBtn } from "./LogInBtn";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function LogInForm() {
  return (
    <div className="w-full max-w-md bg-slate-700/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-slate-600/50">
      <div className="text-center mb-8">
        {/* <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2> */}
        <p className="text-slate-300">
          Sign in to continue your fitness journey
        </p>
      </div>

      <div className="space-y-4 w-full">
        <LoginBtn
          text="Continue with Google"
          icon={<AiFillGoogleCircle className="text-2xl" />}
          provider="google"
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-400 text-sm">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
