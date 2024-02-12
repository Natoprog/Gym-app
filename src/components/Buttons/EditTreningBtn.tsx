"use client";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";

export default function EditTreningBtn({ id }: { id: string }) {
  const router = useRouter();
  const handleModalShow = () => {
    router.push(`trening/?modal=edit&id=${id}`);
  };
  return (
    <button onClick={handleModalShow}>
      <FaEdit color="white" size={20} />
    </button>
  );
}
