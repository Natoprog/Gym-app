import { auth } from "@/auth";
import AddExerciseButton from "@/src/components/Buttons/AddExerciseBtn";
import Calendar from "@/src/components/UI/Navigation/Calendar";
import ExerciseCard from "@/src/components/UI/Posts/ExerciseCard";
import { db } from "@/src/db/drizzle-client";
import { exercises, workouts } from "@/src/db/schema";
import { eq, and } from "drizzle-orm";
import { FaMagic } from "react-icons/fa";

export default async function WorkoutPage({ params }: any) {
  const { year, month, day } = await params;

  const session = await auth();

  const date = `${year}-${month}-${day}`;

  //   const result = await db
  //     .select()
  //     .from(workouts)
  //     .where(
  //       and(eq(workouts.userId, session?.user?.id), eq(workouts.date, date))
  //     );

  const exerciseList = await db
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
        eq(workouts.date, date), // Filtrujemy po dzisiejszej dacie
        eq(exercises.userId, session?.user?.id) // Filtrujemy po zalogowanym użytkowniku
      )
    );

  //   console.log(result);
  return (
    <main className="min-h-[calc(100vh-6rem)] flex flex-col bg-[#040506] text-white">
      <Calendar monthDay={day} />
      <div className="flex flex-col items-center min-w-24">
        <div className="flex gap-2 my-5">
          <AddExerciseButton text="Add exercise" icon="+" />
          <AddExerciseButton text="Autofill from plan" icon={<FaMagic />} />
        </div>
        <div className="flex flex-col gap-2 items-center w-full">
          {exerciseList.map((item) => (
            <ExerciseCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
