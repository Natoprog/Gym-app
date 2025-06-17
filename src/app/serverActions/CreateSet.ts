"use server";

import { db } from "../../db/drizzle-client";
import { exerciseSets as sets } from "../../db/schema";

export async function addSet(exerciseId: number) {
  try {
    const newSet = {
      exerciseId: exerciseId,
    };

    await db.insert(sets).values(newSet).execute();
    return { success: true };
  } catch (error) {
    console.error("Error adding set:", error);
    return { success: false, error: "Failed to add set" };
  }
}
