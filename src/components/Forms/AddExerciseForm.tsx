"use client";

export default function AddExerciseForm({
  onChange,
  index,
  exercise,
}: {
  onChange: React.Dispatch<
    React.SetStateAction<{ exercise: string; series: number; reps: number }[]>
  >;
  index: number;
  exercise: {
    exercise: string;
    series: number;
    reps: number;
  }[];
}) {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name == "exercise") {
      onChange(
        exercise.map((item, i) =>
          i == index ? { ...item, [name]: value } : item
        )
      );
    } else if (name == "series") {
      onChange(
        exercise.map((item, i) =>
          i == index ? { ...item, [name]: Number(value) } : item
        )
      );
    } else
      onChange(
        exercise.map((item, i) =>
          i == index ? { ...item, [name]: Number(value) } : item
        )
      );
  };
  return (
    <div className="flex bg-slate-600 flex-col gap-2 mt-5 mx-5 rounded-md text-white focus:outline-none">
      <input
        type="text"
        name="exercise"
        placeholder="ćwiczenie"
        className="bg-transparent ml-2 mt-2  focus:outline-none"
        onChange={handleChange}
        value={exercise[index].exercise}
      />
      <input
        type="number"
        name="series"
        placeholder="serie"
        className="bg-transparent ml-2 focus:outline-none"
        onChange={handleChange}
        value={exercise[index].series}
      />
      <input
        type="number"
        name="reps"
        placeholder="powtórzenia"
        className="bg-transparent ml-2 mb-2 focus:outline-none"
        onChange={handleChange}
        value={exercise[index].reps}
      />
    </div>
  );
}
