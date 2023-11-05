"use client";

export default function AddExerciseForm() {
  return (
    <div className="flex bg-slate-600 min-h-[150px] flex-col gap-2 mt-5 mx-5 rounded-md text-white focus:outline-none">
      <input
        type="text"
        placeholder="ćwiczenie"
        className="bg-transparent ml-2 mt-2  focus:outline-none"
      />
      <input
        type="number"
        placeholder="serie"
        className="bg-transparent ml-2 focus:outline-none"
      />
      <input
        type="number"
        placeholder="powtórzenia"
        className="bg-transparent ml-2 focus:outline-none"
      />
    </div>
  );
}
