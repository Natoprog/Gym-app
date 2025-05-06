"use client";

import { useForm } from "react-hook-form";

export default function AddExerciseDataForm({}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 bg-[#15151A] p-6 rounded-lg shadow-lg w-96"
    >
      <input
        type="text"
        placeholder="Nazwa ćwiczenia"
        className="bg-transparent border-b-2 border-gray-400 text-white focus:outline-none focus:border-blue-500"
        {...register("exerciseName", { required: true })}
      />
      <textarea
        placeholder="Opis ćwiczenia"
        className="bg-transparent border-b-2 border-gray-400 text-white focus:outline-none focus:border-blue-500"
        {...register("exerciseDescription", { required: false })}
      ></textarea>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
        Dodaj ćwiczenie
      </button>
    </form>
  );
}
