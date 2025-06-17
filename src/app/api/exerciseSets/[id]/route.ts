import { NextResponse } from "next/server";
import { db } from "@/src/db/drizzle-client";
import { exerciseSets } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const exerciseId = parseInt(id);

    if (isNaN(exerciseId)) {
      return NextResponse.json(
        { error: "Invalid exercise ID" },
        { status: 400 }
      );
    }

    const sets = await db
      .select({
        id: exerciseSets.id,
        reps: exerciseSets.reps,
        weight: exerciseSets.weight,
        sets: exerciseSets.sets,
      })
      .from(exerciseSets)
      .where(eq(exerciseSets.exerciseId, exerciseId));

    return NextResponse.json(sets, { status: 200 });
  } catch (error) {
    console.error("Error fetching exercise sets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
