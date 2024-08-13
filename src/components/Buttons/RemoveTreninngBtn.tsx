import { HiOutlineTrash } from "react-icons/hi";
import { getXataClient } from "@/db/xata-client";
import { revalidatePath } from "next/cache";

const xata = getXataClient();

export default function RemoveTreninngBtn({ id }: { id: string }) {
  const RemoveTreningAction = async () => {
    "use server";
    await xata.db.trening.delete(id);

    const res = await xata.db.exercise.search(id);

    res.records.forEach(async (record) => {
      await xata.db.exercise.delete(record.id);
    });

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
