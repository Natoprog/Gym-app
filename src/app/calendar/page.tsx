import { auth } from "@/auth";
import { db } from "@/src/db/drizzle-client";
import { workouts } from "@/src/db/schema";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { and, eq, sql } from "drizzle-orm";
import Link from "next/link";

dayjs.locale("en");

export default async function CalendarPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const currentMonth = dayjs();

  const firstDayCurrentMonth = currentMonth.startOf("month");
  const lastDayCurrentMonth = currentMonth.endOf("month");

  const daysInMonth = lastDayCurrentMonth.date();
  const firstDayWeekday = firstDayCurrentMonth.day();

  const start = firstDayCurrentMonth.toDate();
  const end = lastDayCurrentMonth.toDate();

  const userWorkouts = userId
    ? await db
        .select()
        .from(workouts)
        .where(
          and(
            eq(workouts.userId, userId as string),
            sql`${workouts.createdAt} >= ${start} AND ${workouts.createdAt} <= ${end}`
          )
        )
    : [];

  const workoutDates = new Map();
  userWorkouts.forEach((workout) => {
    const dateStr = dayjs(workout.createdAt).format("YYYY-MM-DD");
    workoutDates.set(dateStr, {
      year: dayjs(workout.createdAt).year(),
      month: dayjs(workout.createdAt).format("MM"),
      day: dayjs(workout.createdAt).format("DD"),
    });
  });

  const calendarDays = [];
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="bg-[#15151A] min-h-[calc(100vh-6rem)] text-white p-4 flex items-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-[#2D3A3A] rounded-lg p-4">
          <h1 className="text-xl font-bold mb-4 text-center">
            MuscleLog
            <span className="ml-2">🗓️</span>
          </h1>
          <div className="text-lg font-semibold mb-5 text-center">
            {currentMonth.format("MMMM")[0].toUpperCase() +
              currentMonth.format("MMMM YYYY").slice(1)}
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["P", "W", "Ś", "C", "P", "S", "N"].map((day, index) => (
              <div
                key={index}
                className="text-center text-sm font-semibold text-gray-400"
              >
                {day}
              </div>
            ))}
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={index} className="h-10" />;
              }

              const dateStr = currentMonth.date(day).format("YYYY-MM-DD");
              const hasWorkout = workoutDates.has(dateStr);
              const isToday = dateStr === dayjs().format("YYYY-MM-DD");

              return (
                <div
                  key={index}
                  className="h-10 flex items-center justify-center relative"
                >
                  {hasWorkout ? (
                    <Link
                      href={`/workout/${workoutDates.get(dateStr).year}/${
                        workoutDates.get(dateStr).month
                      }/${workoutDates.get(dateStr).day}`}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        isToday ? "bg-blue-600" : "bg-gray-600"
                      } hover:bg-blue-500 transition-colors`}
                    >
                      {day}
                    </Link>
                  ) : (
                    <Link
                      href={`/workout/${currentMonth.year()}/${currentMonth.format(
                        "MM"
                      )}/${day}`}
                      className={`w-8 h-8 flex items-center justify-center rounded-full ${
                        isToday ? "bg-blue-600" : ""
                      }`}
                    >
                      {day}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
