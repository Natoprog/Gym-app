"use client";

import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/pl";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.locale("pl");

export default function Calendar({
  date,
}: {
  date: { year: string; month: string; day: string };
}) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(
    `${date.year}-${date.month}-${date.day}`
  );

  const targetDate = dayjs(`${date.year}-${date.month}-${date.day}`);
  const startOfTargetWeek = targetDate.weekday(0);

  const startOfWeek = startOfTargetWeek.add(weekOffset, "week");

  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, "day")
  );

  const handlePreviousWeek = () => {
    setWeekOffset((prev) => prev - 1);
  };

  const handleNextWeek = () => {
    setWeekOffset((prev) => prev + 1);
  };

  const selectedDayRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (selectedDayRef.current) {
      selectedDayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedDate, weekOffset]);

  return (
    <nav className="flex justify-center items-center flex-col p-6 bg-[#2E49C5] rounded-b-3xl max-w-full">
      <div className="text-white text-3xl font-bold mb-4 flex items-center gap-4">
        MuscleLog
        <Link href="/calendar">
          <IoCalendarOutline size={25} />
        </Link>
      </div>
      <div className="text-lg text-gray-200 mb-4">
        {startOfWeek.format("MMMM")[0].toUpperCase() +
          startOfWeek.format("MMMM YYYY").slice(1)}
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handlePreviousWeek}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
        >
          <IoIosArrowBack size={20} />
        </button>
        <div className="flex space-x-4 overflow-x-auto">
          {daysOfWeek.map((day) => {
            const dateString = day.format("YYYY-MM-DD");
            const isSelected = dateString === selectedDate;
            return (
              <Link
                key={dateString}
                href={`/workout/${day.format("YYYY")}/${day.format(
                  "MM"
                )}/${day.format("DD")}`}
                ref={isSelected ? selectedDayRef : null}
                onClick={() => setSelectedDate(dateString)}
                className={`flex flex-col items-center text-white text-lg font-semibold w-12 transition-all duration-300 
                  ${
                    day.isSame(dayjs(), "day")
                      ? "bg-blue-900 rounded-full p-2"
                      : ""
                  } ${isSelected ? "bg-blue-500 rounded-full p-2" : ""}`}
              >
                <div>{day.format("dd").charAt(0)}</div>
                <div>{day.format("D")}</div>
              </Link>
            );
          })}
        </div>
        <button
          onClick={handleNextWeek}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white"
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </nav>
  );
}
