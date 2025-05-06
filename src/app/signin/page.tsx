import LogInForm from "@/src/components/Loging/LogInForm";
import Image from "next/image";

export default function SignInPage() {
  return (
    <main className="flex flex-col md:flex-row justify-center items-center gap-10 p-6 min-h-[calc(100vh-96px)]">
      <div className="w-full md:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold text-white">Welcome to Gym App</h1>
        <p className="text-lg text-slate-300">
          Your personal fitness companion that helps you track your workouts,
          monitor your progress, and achieve your fitness goals.
        </p>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            Features available after sign up:
          </h2>
          <ul className="space-y-2 text-slate-300">
            {/* <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Personalized workout plans
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Progress tracking
            </li> */}
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Exercise library
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Workout history
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <LogInForm />
      </div>
    </main>
  );
}
