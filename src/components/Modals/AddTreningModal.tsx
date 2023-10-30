"use client";

import { BiTime } from "react-icons/bi";
import {  useSearchParams } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AddTreningModal() {

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    const data = fetch("/api/addTrening", {
        method: "POST",
        body: JSON.stringify({
            name: "trening",
            time: 1.5,
        }),
        });
    };

  const searchParams = useSearchParams();
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const showModal = searchParams.get("modal");

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
        className="fixed w-5/6 top-50 left-50 -translate-x-50 -translate-y-50 z-10 rounded-md bg-[#A86AF7] backdrop:bg-gray-800/50"
      >
        <div className="inset-y-0 left-0 rounded-md h-full">
          <form className="flex flex-col">
            <div className="w-full bg-[#7747B3] min-h-[100px] flex flex-col justify-between rounded-md">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Nazwa"
                  className="bg-transparent ml-5 mt-2 border-none focus:outline-none min-w-1/2 text-white"
                />
                <Link href="/trening" className="mr-2 text-white">
                  <AiOutlineClose size={20}/>
                </Link>
              </div>
              <div className="flex items-center gap-1 ml-5 mb-2">
                <BiTime color="white" />
                <input
                  type="number"
                  placeholder="1,5 godz"
                  className="bg-transparent text-white focus:outline-none"
                />
              </div>
            </div>
            <div>
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
            </div>
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
