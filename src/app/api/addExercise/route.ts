import { NextResponse } from "next/server";
import { db } from "@/src/db/drizzle-client"; // Załóżmy, że masz plik `db.ts` do konfiguracji Drizzle
import { exercise } from "@/src/db/schema";
// Tabela ćwiczeń w Drizzle ORM

export async function POST(req: Request) {
  try {
    const { name, sets, reps, weight, userId } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Nieprawidłowe dane" },
        { status: 400 }
      );
    }

    await db.insert(exercise).values({
      name,
      sets: sets ?? null,
      reps: reps ?? null,
      weight: weight ?? null,
      userId: userId, // Powiązanie z użytkownikiem
    });

    return NextResponse.json(
      { message: "Ćwiczenie zapisane" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Błąd zapisu ćwiczenia:", error);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
