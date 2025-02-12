"use server";

import { signIn } from "@/auth";

export async function LoginAction() {
  await signIn("google", { redirectTo: "/in" });
}
