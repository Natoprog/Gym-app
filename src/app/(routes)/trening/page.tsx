import AddTreningBtn from "@/src/components/Buttons/AddTreningBtn";
import AddTreningModal from "@/src/components/Modals/AddTreningModal";
import EditTreningModal from "@/src/components/Modals/EditTrening.tsx/EditTreningModal";
import GetTrenings from "@/src/components/UI/Posts/GetTrenings";

export default async function TreningPage() {
  return (
    <main className="min-h-[calc(100vh-6rem)] flex justify-center items-center gap-10 flex-col">
      <div className="mt-5">
        <AddTreningBtn />
        <AddTreningModal />
      </div>
      <GetTrenings />
    </main>
  );
}
