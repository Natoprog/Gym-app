"use server";

import { eq } from "drizzle-orm";
import { db } from "../../db/drizzle-client";
import { exerciseSets as sets } from "../../db/schema";

export async function DeleteSet(setId: number) {
  try {
    await db.delete(sets).where(eq(sets.id, setId)).execute();
    return { success: true };
  } catch (error) {
    console.error("Error adding set:", error);
    return { success: false, error: "Failed to add set" };
  }
}
