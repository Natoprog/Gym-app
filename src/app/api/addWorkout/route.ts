import { NextResponse } from "next/server";
import { db } from "@/src/db/schema";
import { workouts } from "@/src/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId, date } = await req.json();
    if (!userId || !date) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const today = new Date();

    const existingWorkout = await db
      .select()
      .from(workouts)
      .where(
        and(
          eq(workouts.userId, userId),
          eq(workouts.date, today.toISOString().split("T")[0])
        )
      )
      .limit(1);

    if (existingWorkout.length > 0) {
      return NextResponse.json(existingWorkout[0]);
    }
    const newWorkout = await db
      .insert(workouts)
      .values({ userId, date: today.toISOString().split("T")[0] })
      .returning();

    return NextResponse.json(newWorkout[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
