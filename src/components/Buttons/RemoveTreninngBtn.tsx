import { HiOutlineTrash } from "react-icons/hi";
import { getXataClient } from "@/utils/xata";
import { revalidatePath } from "next/cache";

const xata = getXataClient();

export default function RemoveTreninngBtn({ id }: { id: string }) {
  const RemoveTreningAction = async () => {
    "use server";
    await xata.db.trening.delete(id);
    revalidatePath("/trening");
  };

  return (
    <form action={RemoveTreningAction}>
      <button>
        <HiOutlineTrash color="white" size={20} />
      </button>
    </form>
  );
}
