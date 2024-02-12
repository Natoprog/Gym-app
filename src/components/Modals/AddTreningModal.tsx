"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AddExerciseForm from "../Form/AddExerciseForm";
import AddTreningForm from "../Form/AddTreningForm";
import { useSession } from "next-auth/react";

export default function AddTreningModal() {
  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const showModal = searchParams.get("modal");
  const router = useRouter();

  const { data: session } = useSession();

  const [exercise, setExercise] = useState([
    { exercise: "", series: NaN, reps: NaN },
  ]);
  const [trening, setTrening] = useState({
    treningInfo: {
      treningName: "",
      treningTime: NaN,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (exercise.length >= 1) {
      const data = await fetch("/api/addTrening", {
        method: "POST",
        body: JSON.stringify({
          name: trening.treningInfo.treningName,
          time: trening.treningInfo.treningTime,
          user: session?.user?.id,
        }),
      });
      const response = await data.json();
      exercise.forEach((item, index) => {
        if (item.exercise == "") {
          exercise.splice(index, 1);
        }
      });

      const addExercise = await fetch("/api/addExercise", {
        method: "POST",
        body: JSON.stringify({
          exercise,
          treningId: response.id,
        }),
      });
    } else if (exercise.length == 0) {
      const data = await fetch("/api/addTrening", {
        method: "POST",
        body: JSON.stringify({
          name: trening.treningInfo.treningName,
          time: trening.treningInfo.treningTime,
          user: session?.user?.id,
        }),
      });
    }

    setTrening((prev) => ({
      ...prev,
      treningInfo: { treningName: "", treningTime: NaN },
    }));
    setExercise([{ exercise: "", series: NaN, reps: NaN }]);
    router.push("/trening");
  };

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    setExercise([...exercise, { exercise: "", series: NaN, reps: NaN }]);
  };

  useEffect(() => {
    if (showModal === "true") {
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
              {exercise.map((_, index) => (
                <AddExerciseForm
                  key={index}
                  onChange={setExercise}
                  index={index}
                  exercise={exercise}
                />
              ))}
              <button onClick={handleAddExercise}>
                Dodaj kolejne ćwiczenie
              </button>
            </form>
            <div className="w-full flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-red-700 rounded-md px-5 py-1 m-2 text-white"
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
