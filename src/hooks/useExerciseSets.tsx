import { useQuery } from "@tanstack/react-query";

const fetchExerciseSets = async (exerciseId: number) => {
  const response = await fetch(`/api/exerciseSets/${exerciseId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch exercise sets");
  }

  return response.json();
};

export const useExerciseSets = (exerciseId: number) => {
  return useQuery({
    queryKey: ["exerciseSets", exerciseId],
    queryFn: () => fetchExerciseSets(exerciseId),
  });
};
