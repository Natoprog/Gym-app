import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pl";
import Link from "next/link";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.locale("pl");

export default function Calendar({ monthDay }: { monthDay: string }) {
  const today = dayjs();
  const startOfWeek = today.weekday(0);

  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, "day")
  );

  return (
    <nav className="flex justify-center items-center flex-col p-6 bg-blue-700 rounded-b-3xl">
      <div className="text-white text-3xl font-bold mb-4">MuscleLog</div>
      <div className="flex space-x-4">
        {daysOfWeek.map((day) => (
          <Link
            key={day.format("YYYY-MM-DD")}
            href={`/workout/${day.format("YYYY")}/${day.format(
              "MM"
            )}/${day.format("DD")}`}
            className={`flex flex-col items-center text-white text-lg font-semibold w-12 
              ${
                day.isSame(today, "day")
                  ? "bg-blue-900 rounded-full p-2"
                  : "mt-2"
              } ${
              day.format("DD") === monthDay
                ? "bg-blue-400 rounded-full p-2"
                : ""
            }}`}
          >
            <div>{day.format("dd").charAt(0)}</div>
            <div>{day.format("D")}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
