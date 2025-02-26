"use server";

import { db } from "@/src/db/drizzle-client"; // Importuj bazę danych
import { exerciseSets as sets } from "@/src/db/schema"; // Importuj schemat tabeli
import { eq } from "drizzle-orm";

export async function updateSet(
  setId: number,
  updates: { reps?: number; weight?: number }
) {
  try {
    await db.update(sets).set(updates).where(eq(sets.id, setId));
    return { success: true };
  } catch (error) {
    console.error("Błąd aktualizacji setu:", error);
    return { success: false, error };
  }
}
