import AddExerciseButton from "@/src/components/Buttons/AddExerciseBtn";
import Calendar from "@/src/components/UI/Navigation/Calendar";
import { FaMagic } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { db } from "@/src/db/drizzle-client";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { exercise } from "@/src/db/schema";

export default async function WorkoutPage() {
  const session = await auth();

  const exercises = await db
    .select()
    .from(exercise)
    .where(eq(exercise.userId, session?.user?.id));

  return (
    <main className="min-h-[calc(100vh-6rem)] flex flex-col bg-[#040506] text-white">
      <Calendar />
      <div className="flex gap-2">
        <AddExerciseButton text="Add exercise" icon="+" />
        <AddExerciseButton text="Autofill from plan" icon={<FaMagic />} />
      </div>
      <div>
        <h4>Exercises List</h4>
        {exercises.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </main>
  );
}
