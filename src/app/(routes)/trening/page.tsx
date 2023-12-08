import AddTreningBtn from "@/src/components/Buttons/AddTreningBtn";
import AddTreningModal from "@/src/components/Modals/AddTreningModal";
import GetTrenings from "@/src/components/UI/Posts/GetTrenings";

export default async function TreningPage() {

  return (
    <main className="flex justify-center items-center w-screen h-screen gap-10 flex-col">
      <div>
        <AddTreningBtn />
        <AddTreningModal />
      </div>
      <GetTrenings />
    </main>
  );
}
