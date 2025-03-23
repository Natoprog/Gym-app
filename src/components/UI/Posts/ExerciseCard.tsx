"use client";
import { addSet } from "@/src/app/serverActions/CreateSet";
import { DeleteSet } from "@/src/app/serverActions/DeleteSet";
import { updateSet } from "@/src/app/serverActions/UpdateSet";
import { useExerciseSets } from "@/src/hooks/useExerciseSets";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi";
import { IoChevronDownOutline } from "react-icons/io5";
import { useDebouncedCallback } from "use-debounce";

export default function ExerciseCard({
  data,
  isPastWorkout,
}: {
  data: any;
  isPastWorkout: boolean;
}) {
  const queryClient = useQueryClient();
  const { data: sets = [], isLoading, error } = useExerciseSets(data.id);

  const [isExpanded, setIsExpanded] = useState(false);
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: { sets: sets || [], reps: undefined, weight: undefined },
  });

  const debouncedUpdateSet = useDebouncedCallback(async (setId, value) => {
    await updateSet(setId, value);
    await queryClient.invalidateQueries({
      queryKey: ["exerciseSets", data.id],
    });
  }, 1000);

  const handleAddSet = async () => {
    const result = await addSet(data.id);
    if (result.success) {
      await queryClient.invalidateQueries({
        queryKey: ["exerciseSets", data.id],
      });
    }
  };

  const handleDeleteSet = async (setId: number) => {
    const result = await DeleteSet(setId);
    if (result.success) {
      // Inwaliduj zapytanie, aby odświeżyć dane
      await queryClient.invalidateQueries({
        queryKey: ["exerciseSets", data.id],
      });
    }
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg w-full max-w-md">
      <div className="flex justify-between items-center">
        <div
          className="cursor-pointer w-100"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h2 className="text-lg font-bold flex items-center gap-2">
            {data.name}
            {isExpanded ? (
              <IoChevronDownOutline className="rotate-180" />
            ) : (
              <IoChevronDownOutline />
            )}
          </h2>
          <p className="text-gray-400">
            {isLoading
              ? "Loading..."
              : sets.filter((s: any) => s.reps > 0).length +
                "/" +
                sets.length +
                " sets done"}
          </p>
        </div>
        {!isPastWorkout && (
          <button
            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer"
            onClick={handleAddSet}
          >
            <FiPlus className="text-gray-300" />
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="mt-4">
          {sets.length > 0 ? (
            <form className="space-y-2" onSubmit={handleSubmit(() => {})}>
              {sets.map(
                (
                  set: { id: number; reps: number; weight: number },
                  index: number
                ) => (
                  <div key={set.id} className="flex items-center gap-2">
                    <div className="flex justify-between items-center bg-gray-800 p-2 rounded-md w-full">
                      <span className="text-gray-400">Reps</span>
                      <Controller
                        name={`sets.${index}.reps`}
                        control={control}
                        defaultValue={set.reps || ""}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className={`w-10 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                              isPastWorkout ? "cursor-not-allowed" : ""
                            }`}
                            onBlur={(e) => {
                              if (isPastWorkout) return;
                              const newValue = Number(e.target.value);
                              field.onChange(newValue);
                              debouncedUpdateSet(set.id, { reps: newValue });
                            }}
                            disabled={isPastWorkout}
                          />
                        )}
                      />
                      <span className="text-gray-400">Weight</span>
                      <Controller
                        name={`sets.${index}.weight`}
                        control={control}
                        defaultValue={set.weight || ""}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="number"
                            className={`w-10 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                              isPastWorkout ? "cursor-not-allowed" : ""
                            }`}
                            onBlur={(e) => {
                              if (isPastWorkout) return;
                              const newValue = Number(e.target.value);
                              field.onChange(newValue);
                              debouncedUpdateSet(set.id, { weight: newValue });
                            }}
                            disabled={isPastWorkout}
                          />
                        )}
                      />
                    </div>
                    {!isPastWorkout && (
                      <button
                        className="p-2 cursor-pointer"
                        onClick={() => handleDeleteSet(set.id)}
                      >
                        <HiOutlineTrash color="white" size={20} />
                      </button>
                    )}
                  </div>
                )
              )}
            </form>
          ) : (
            <p className="text-gray-400 text-center">
              Nie dodano żadnych setów.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
