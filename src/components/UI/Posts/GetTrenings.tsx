import { BiTime } from "react-icons/bi";
import { getXataClient } from "../../../../utils/xata";
import { auth } from "@/auth";
import RemoveTreninngBtn from "../../Buttons/RemoveTreninngBtn";

const xata = getXataClient();

export default async function GetTrenings() {
  const session = await auth();
  const data = await xata.db.trening
    .filter({ "user.id": session?.user?.id ? session?.user?.id : "" })
    .getAll();

  return (
    <>
      {data.map((trening) => (
        <div
          key={trening.id}
          className="w-5/6 bg-[#A86AF7] rounded-[20px] pt-5 px-5 pb-8 relative"
        >
          <p className="mb-5 text-white">{trening.name}</p>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <BiTime color="white" />
              <h4 className="text-white">{trening.time}</h4>
            </div>
            <RemoveTreninngBtn id={trening.id}/>
          </div>
          <button className="w-full absolute bottom-0 left-0 flex justify-center bg-purple-200 rounded-b-[20px] p-1">
            START
          </button>
        </div>
      ))}
    </>
  );
}
