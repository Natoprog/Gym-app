import { auth } from "@/auth";
import ExerciseCard from "@/src/components/UI/Posts/ExerciseCard";
import { db } from "@/src/db/drizzle-client";
import { exercises, workouts } from "@/src/db/schema";
import { eq, and } from "drizzle-orm";
import dayjs from "dayjs";
import Calendar from "@/src/components/UI/Navigation/Calendar";
import AddExerciseButton from "@/src/components/Buttons/AddExerciseBtn";
import { FaMagic } from "react-icons/fa";

export default async function WorkoutPage({ params }: any) {
  const { year, month, day } = await params;
  const session = await auth();

  if (!session) {
    return (
      <main className="min-h-[calc(100vh-6rem)] flex flex-col bg-[#040506] text-white">
        <div className="flex flex-col items-center min-w-24">
          <p>No user session found. Please log in.</p>
        </div>
      </main>
    );
  }

  const date = `${year}-${month}-${day}`;
  const workoutDate = dayjs(date);
  const today = dayjs("2025-03-13"); // Bieżąca data według podanego kontekstu

  const isPastWorkout = workoutDate.isBefore(today, "day"); // Sprawdza, czy data jest w przeszłości

  const exerciseList = await db
    .select({
      id: exercises.id,
      userId: exercises.userId,
      workoutId: exercises.workoutId,
      name: exercises.name,
    })
    .from(exercises)
    .innerJoin(workouts, eq(exercises.workoutId, workouts.id))
    .where(and(eq(workouts.date, date), eq(exercises.userId, session.user.id)));

  if (isPastWorkout) {
    const formattedDate = workoutDate.format("D MMMM YYYY");
    return (
      <main className="min-h-[calc(100vh-6rem)] flex flex-col bg-[#15151A] text-white">
        <Calendar date={{ year, month, day }} />
        {/* <div className="bg-[#2D3A3A] rounded-lg p-4 mx-4 mt-4">
          <h1 className="text-xl font-bold text-center">Archiwalny trening</h1>
          <p className="text-center text-gray-400 mt-1">{formattedDate}</p>
        </div> */}
        <div className="flex flex-col items-center min-w-24">
          <div className="flex flex-col gap-2 items-center w-full mt-5">
            {exerciseList.length > 0 ? (
              exerciseList.map((item) => (
                <ExerciseCard key={item.id} data={item} isPastWorkout={true} />
              ))
            ) : (
              <p className="text-gray-400">Brak ćwiczeń dla tego dnia.</p>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-6rem)] flex flex-col bg-[#15151A] text-white">
      <Calendar date={{ year, month, day }} />
      <div className="flex flex-col items-center min-w-24">
        <div className="flex gap-2 my-5">
          <AddExerciseButton text="Add exercise" icon="+" />
          <AddExerciseButton text="Autofill from plan" icon={<FaMagic />} />
        </div>
        <div className="flex flex-col gap-2 items-center w-full mt-5">
          {exerciseList.map((item) => (
            <ExerciseCard key={item.id} data={item} isPastWorkout={false} />
          ))}
        </div>
      </div>
    </main>
  );
}
