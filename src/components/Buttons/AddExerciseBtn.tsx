"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import AddExerciseModal from "../Modals/AddExerciseModal";

export default function AddExerciseButton({
  text,
  icon,
}: {
  text?: string;
  icon: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="flex items-center gap-2 px-4 py-2 border border-blue-500 rounded-lg text-[#9FABDE] transition cursor-pointer"
        onClick={() => setShowModal(!showModal)}
      >
        <span className="text-2xl">{icon}</span>
        <span className="text-lg">{text}</span>
      </button>
      {showModal &&
        createPortal(
          <AddExerciseModal onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  );
}
