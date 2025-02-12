import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function AddExerciseModal({ onClose }: { onClose: () => void }) {
  const [exerciseName, setExerciseName] = useState("");
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseName.trim()) return;

    try {
      const response = await fetch("/api/addExercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: exerciseName, userId: session?.user?.id }),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas zapisu ćwiczenia");
      }

      setExerciseName("");
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-4 bg-[#222329] rounded-md text-white w-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3>Dodaj ćwiczenie</h3>
        <button onClick={onClose}>
          <IoClose size={20} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="exerciseName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nazwa ćwiczenia
          </label>
          <input
            type="text"
            id="exerciseName"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Bicep curls"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Zapisz
        </button>
      </form>
    </div>
  );
}
