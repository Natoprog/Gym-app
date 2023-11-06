import { BiTime } from "react-icons/bi";
import { getXataClient } from "../../../../utils/xata";
import { HiOutlineTrash } from "react-icons/hi";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/app/api/auth/[...nextauth]/route";

const xata = getXataClient();

export default async function GetTrenings() {

    const session = await getServerSession(authConfig);
    const data = await xata.db.trening.filter({"user.email": session?.user?.email}).getAll();
    console.log(data)

  

  return (
    <>
      {data.map((trening) => (
        <div
          key={trening.id}
          className="w-5/6 bg-[#A86AF7] rounded-[20px] pt-5 pl-5 pr-5 pb-8 relative"
        >
          <p className="mb-5 text-white">{trening.name}</p>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <BiTime color="white" />
              <h4 className="text-white">{trening.time}</h4>
            </div>
            <button>
              <HiOutlineTrash color="white" size={20} />
            </button>
          </div>
          <button className="w-full absolute bottom-0 left-0 flex justify-center bg-purple-200 rounded-b-[20px] p-1">
            START
          </button>
        </div>
      ))}
    </>
  );
}
