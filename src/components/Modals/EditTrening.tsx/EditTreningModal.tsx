"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";

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

  const { data } = useQuery("getTrening", async () => {
    const response = await fetch("/api/getTrening/", {
      method: "POST",
      body: JSON.stringify({ id: treningId }),
    });
    const res = await response.json();
    if (res) return res;
  });

  // const asyncData = async () => {
  //   const response = await fetch("/api/getTrening/", {
  //     method: "POST",
  //     body: JSON.stringify({ id: treningId }),
  //   });
  //   const res = await response.json();
  //   if (res) setData(res);
  // };

  useEffect(() => {
    if (showModal === "edit") {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  // const response = fetch("/api/getTrening/", {
  //   method: "POST",
  //   body: JSON.stringify({ id: treningId }),
  // }).then((resp) => {
  //   return resp.json();
  // });

  return (
    <>
      {showModal && (
        <dialog
          ref={modalRef}
          className="fixed w-5/6 h-5/6 top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-md bg-[#A86AF7] backdrop:bg-gray-800/50"
        >
          <div>{data?.trening.name}</div>
          {/* <div className="inset-y-0 left-0 rounded-md h-full">
            <form className="flex flex-col">
              <AddTreningForm
                onChange={setTrening}
                trening={{
                  name: trening.treningInfo.treningName,
                  time: trening.treningInfo.treningTime,
                }}
              />
              {treningData.exercises.map((_, index) => (
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
          </div> */}
        </dialog>
      )}
    </>
  );
}
