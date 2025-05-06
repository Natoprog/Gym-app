import AddExerciseButton from "@/src/components/Buttons/AddExerciseBtn";
import Calendar from "@/src/components/UI/Navigation/Calendar";
import { FaMagic } from "react-icons/fa";
import { db } from "@/src/db/drizzle-client";
import { auth } from "@/auth";
import { eq, and } from "drizzle-orm";
import { exercises, exerciseSets, workouts } from "@/src/db/schema";
import ExerciseCard from "@/src/components/UI/Posts/ExerciseCard";

export default async function WorkoutPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return (
      <main className="min-h-[calc(100vh-6rem)] flex flex-col bg-[#040506] text-white">
        <div className="flex flex-col items-center min-w-24">
          <p>No user session found. Please log in.</p>
        </div>
      </main>
    );
  }

  const today = new Date();

  const result = await db
    .select({
      id: exercises.id,
      userId: exercises.userId,
      workoutId: exercises.workoutId,
      name: exercises.name,
    })
    .from(exercises)
    .innerJoin(workouts, eq(exercises.workoutId, workouts.id))
    .where(
      and(
        eq(workouts.date, new Date().toISOString().split("T")[0]), // Filtrujemy po dzisiejszej dacie
        eq(exercises.userId, session?.user?.id) // Filtrujemy po zalogowanym użytkowniku
      )
    );

  return (
    <main className="min-h-[calc(100vh-6rem)] flex flex-col bg-[#040506] text-white">
      <Calendar date={{
        year: today.getFullYear().toString(),
        month: (today.getMonth() + 1).toString(),
        day: today.getDate().toString()
      }} />
      <div className="flex flex-col items-center min-w-24">
        <div className="flex gap-2 my-5">
          <AddExerciseButton text="Add exercise" icon="+" />
          {/* <AddExerciseButton text="Autofill from plan" icon={<FaMagic />} /> */}
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          {result.map((item) => (
            <ExerciseCard key={item.id} data={item} isPastWorkout={false} />
          ))}
        </div>
      </div>
    </main>
  );
}
