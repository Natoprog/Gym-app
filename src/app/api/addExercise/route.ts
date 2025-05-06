import { NextResponse } from "next/server";
import { db } from "@/src/db/drizzle-client";
import { exercises } from "@/src/db/schema";

export async function POST(req: Request) {
  try {
    const { name, userId, date } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Nieprawidłowe dane" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.VERCEL_URL
      ? "https://" + process.env.VERCEL_URL
      : "http://localhost:3000";

    const workoutRes = await fetch(`${baseUrl}/api/addWorkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: date,
        userId: userId,
      }),
    });

    if (!workoutRes.ok) {
      return NextResponse.json(
        {
          error: "Failed to get or create workout",
          baseUrl: baseUrl,
          workoutRes: workoutRes,
        },
        { status: 500 }
      );
    }

    const workout = await workoutRes.json();

    // Dodaj ćwiczenie do treningu
    const newExercise = await db.insert(exercises).values({
      userId: userId,
      name: name,
      workoutId: workout.id,
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
