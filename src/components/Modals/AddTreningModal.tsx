"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AddExerciseForm from "../Form/AddExerciseForm";
import AddTreningForm from "../Form/AddTreningForm";
import {useSession, getSession} from "next-auth/react"
import { getXataClient } from "./../../../utils/xata";


export default function AddTreningModal() {
  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const showModal = searchParams.get("modal");


  const {data: session} = useSession()


  const [exercise, setExercise] = useState([
    { exercise: "", series: 0, reps: 0 },
    { exercise: "", series: 0, reps: 0 },
  ]);
  const [trening, setTrening] = useState({
    treningInfo: {
      treningName: "",
      treningTime: NaN,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = fetch("/api/addTrening", {
        method: "POST",
        body: JSON.stringify({
            name: trening.treningInfo.treningName,
            time: trening.treningInfo.treningTime,
            user: session?.user?.id,
        }),
        });
    console.log(data);
    setTrening(prev => ({...prev, treningInfo: {treningName: "", treningTime: NaN}}));
    
  };

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    setExercise([...exercise, { exercise: "", series: 0, reps: 0 }]);
  };


  useEffect(() => {
    if (showModal === "true") {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  const modal: JSX.Element | null =
    showModal === "true" ? (
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
            {exercise.map((ex, index) => {
              return <AddExerciseForm key={index} />;
            })}
            <button onClick={handleAddExercise}>Dodaj kolejne ćwiczenie</button>
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
    ) : null;

  return modal;
}
