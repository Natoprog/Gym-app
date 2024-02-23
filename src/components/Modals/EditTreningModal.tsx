"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import AddTreningForm from "../Form/AddTreningForm";
import AddExerciseForm from "../Form/AddExerciseForm";
import { revalidatePath } from "next/cache";

export type Trening = {
  trening: {
    id: string;
    name: string;
  };
};

export default function EditTreningModal() {
  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const showModal = searchParams.get("modal");
  const treningId = searchParams.get("id");

  const router = useRouter();

  const [trening, setTrening] = useState({
    treningInfo: {
      treningName: "",
      treningTime: 0,
    },
  });
  const [exercise, setExercise] = useState([
    { exercise: "", series: NaN, reps: NaN },
  ]);

  const { data, refetch } = useQuery(
    "getTrening",
    async () => {
      const response = await fetch("/api/getTrening/", {
        method: "POST",
        body: JSON.stringify({ id: treningId }),
      });
      const res = await response.json();
      if (res) return res;
    },
    {
      onSuccess: (data) => {
        setTrening(() => ({
          treningInfo: {
            treningName: data.trening.name,
            treningTime: data.trening.time,
          },
        }));
        setExercise(() =>
          data.exercises.map((exercise: any) => ({
            exercise: exercise.name,
            series: exercise.sets,
            reps: exercise.reps,
          }))
        );
      },
    }
  );
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const data = await fetch("/api/editTrening", {
        method: "POST",
        body: JSON.stringify({
          name: trening.treningInfo.treningName,
          time: trening.treningInfo.treningTime,
          id: treningId,
        }),
      });
      const response = await data.json();
      router.push("/trening");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showModal === "edit") {
      refetch();
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  return (
    <>
      {showModal && (
        <dialog
          ref={modalRef}
          className="fixed w-5/6 h-5/6 top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-md bg-[#A86AF7] backdrop:bg-gray-800/50"
        >
          <div className="inset-y-0 left-0 rounded-md h-full">
            <form className="flex flex-col">
              <AddTreningForm
                onChange={setTrening}
                trening={{
                  name: trening.treningInfo.treningName,
                  time: trening.treningInfo.treningTime,
                }}
              />
              {data?.exercises.map((_: any, index: number) => (
                <AddExerciseForm
                  key={index}
                  onChange={setExercise}
                  index={index}
                  exercise={exercise}
                />
              ))}
              <button>Dodaj kolejne ćwiczenie</button>
            </form>
            <div className="w-full flex justify-center">
              <button
                className="bg-red-700 rounded-md px-5 py-1 m-2 text-white"
                onClick={handleSubmit}
              >
                Zapisz
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
