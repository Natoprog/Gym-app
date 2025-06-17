import Link from "next/link";

export default async function Exerecise() {
  return (
    <main className="flex justify-center items-center w-screen h-screen gap-10 text-white">
      <Link href="/exercise/custom">Custom</Link>
      <button>Database list</button>
    </main>
  );
}
