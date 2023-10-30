"use client"

import { useRouter } from "next/navigation"
import { AiOutlinePlus } from "react-icons/ai"


export default function AddTreningBtn() {
    const router = useRouter()
    const handleShowModal = () => {
        router.push("/trening?modal=true")
    }
  return (
    <button onClick={handleShowModal} className="flex items-center gap-1 bg-fuchsia-600 px-[8px] py-[5px] rounded-full text-white">
        <AiOutlinePlus style={{strokeWidth: "100"}}/>
        Dodaj trening
    </button>
  )
}
