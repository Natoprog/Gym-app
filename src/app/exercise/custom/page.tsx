import { auth } from "@/auth";
import AddExerciseDataForm from "@/src/components/Form/AddExerciseDataForm";
import Image from "next/image";
import Link from "next/link";

export default async function AddExercise() {
  const session = await auth();

  return (
    <main className="flex justify-center flex-col items-center w-screen min-h-screen gap-10 text-white">
      <h1 className="text-2xl font-bold">Dodaj ćwiczenie</h1>
      <AddExerciseDataForm />
    </main>
  );
}
