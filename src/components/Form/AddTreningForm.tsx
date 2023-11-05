"use client";

import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { BiTime } from "react-icons/bi";

export default function AddTreningForm({
  onChange,
  trening,
}: {
  onChange: React.Dispatch<
    React.SetStateAction<{
      treningInfo: {
        treningName: string;
        treningTime: number;
      };
    }>
  >;
  trening: { name: string; time: number };
}) {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name == "treningTime")
      onChange((prev) => ({
        ...prev,
        treningInfo: { ...prev.treningInfo, [name]: parseFloat(value) },
      }));
    else
      onChange((prev) => ({
        ...prev,
        treningInfo: { ...prev.treningInfo, [name]: value },
      }));
    console.log(name);
    console.log(trening);
  };

  return (
    <div className="w-full bg-[#7747B3] min-h-[100px] flex flex-col justify-between rounded-md">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Nazwa"
          className="bg-transparent ml-5 mt-2 border-none focus:outline-none min-w-1/2 text-white"
          onChange={handleChange}
          name="treningName"
          value={trening.name}
        />
        <Link href="/trening" className="mr-2 text-white">
          <AiOutlineClose size={20} />
        </Link>
      </div>
      <div className="flex items-center gap-1 ml-5 mb-2">
        <BiTime color="white" />
        <input
          type="number"
          placeholder="1,5 godz"
          className="bg-transparent text-white focus:outline-none"
          onChange={handleChange}
          name="treningTime"
          value={trening.time}
        />
      </div>
    </div>
  );
}
