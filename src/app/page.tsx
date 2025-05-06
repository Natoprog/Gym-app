import { auth } from "@/auth";
import Link from "next/link";

export default async function Index() {
  const session = await auth();
  const date = new Date();

  return (
    <main className="min-h-[calc(100vh-6rem)] bg-[#111115] text-white">
      <div className="w-full flex justify-center py-6 md:py-8 bg-blue-700 rounded-b-full">
        <h2 className="text-3xl md:text-4xl font-bold">Muscle Log</h2>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {session ? (
          <div className="space-y-6 md:space-y-8">
            <div className="bg-[#1a1a1f] p-4 md:p-6 rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Welcome, {session?.user?.name}!</h3>
              <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                Get ready to track your fitness journey and achieve your goals with Muscle Log.
              </p>
              <p className="text-gray-400 text-xs md:text-sm">
                To manage your account or log out, please visit the <Link href="/account" className="text-blue-400 hover:text-blue-300">Account</Link> section.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-[#1a1a1f] p-4 md:p-6 rounded-lg shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">About Muscle Log</h3>
                <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                  Muscle Log is your personal fitness companion designed to help you track workouts, monitor progress, and stay motivated on your fitness journey.
                </p>
                <ul className="list-disc list-inside text-gray-300 text-sm md:text-base space-y-1 md:space-y-2">
                  <li>Create and manage your workout routines</li>
                  <li>Track your progress over time</li>
                  <li>Set and achieve your fitness goals</li>
                  <li>Stay consistent with your training</li>
                </ul>
              </div>

              <div className="bg-[#1a1a1f] p-4 md:p-6 rounded-lg shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Start Your Journey</h3>
                <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                  Ready to take your fitness to the next level? Create your first workout plan and start tracking your progress today!
                </p>
                <Link 
                  href={`/workout/${date.getFullYear()}/${
                    date.getMonth() + 1
                  }/${date.getDate()}`}
                  className="inline-block w-full md:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                >
                  Create Workout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 md:py-12">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Welcome to Muscle Log</h3>
            <p className="text-gray-300 text-sm md:text-base mb-6">
              Sign in to start tracking your workouts and achieving your fitness goals.
            </p>
            <Link 
              href="/signin" 
              className="inline-block w-full md:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
