"use client";

import { HiOutlineTrash } from "react-icons/hi";

export default function RemoveTreninngBtn() {
  const handleRemoveTrening = () => {
    console.log("remove");
  };

  return (
    <button onClick={handleRemoveTrening}>
      <HiOutlineTrash color="white" size={20} />
    </button>
  );
}
