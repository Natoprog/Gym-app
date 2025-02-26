// actions.ts
"use server"; // Oznacza, że to kod wykonywany tylko na serwerze

import { eq } from "drizzle-orm";
import { db } from "../../db/drizzle-client";
import { exerciseSets as sets } from "../../db/schema";
import { revalidatePath } from "next/cache";

export async function DeleteSet(setId: number) {
  try {
    await db.delete(sets).where(eq(sets.id, setId)).execute();
    revalidatePath("/workout");
    return { success: true };
  } catch (error) {
    console.error("Error adding set:", error);
    return { success: false, error: "Failed to add set" };
  }
}
