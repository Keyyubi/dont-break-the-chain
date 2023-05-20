import React, { useState } from "react";
import "./calendar.scss";

interface CalendarProps {
  // Add any additional props you need
}

const lastDayOfTheMonth = (year: number, month: number): number => {
  const nextMonthsFirstDay = new Date(year, month + 1, 1);
  const lastDayOfGivenMonth = new Date(nextMonthsFirstDay.getTime() - 1);

  return lastDayOfGivenMonth.getDate();
};

const renderHeaders = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return daysOfWeek.map((day) => <div className="day-header">{day}</div>);
};

const Calendar: React.FC<CalendarProps> = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const renderDates = () => {
    const dates: React.ReactNode[] = [];

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Get the first day of the current month
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    // Get the last day of the current month
    const lastDay = lastDayOfTheMonth(currentYear, currentMonth);

    // Get the last day of the previous month
    const lastDayOfPrevMonthDate = new Date(
      currentYear,
      currentMonth,
      0
    ).getDate();

    // Calculate the total number of days to render (Grid size)
    const totalDays = 7 * 5;

    for (let i = 0; i < firstDayIndex; i++) {
      const day = lastDayOfPrevMonthDate - (firstDayIndex - i - 1);

      dates.push(
        <div key={`prev-${i}`} className="date non-current">
          <span className="date-text">{day}</span>
        </div>
      );
    }

    for (let i = 1; i < totalDays; i++) {
      const isCurrentMonth = i <= lastDay;

      dates.push(
        isCurrentMonth ? (
          <div
            key={`current-${i}`}
            className={`date ${i === selected ? "selected" : ""}`}
            onClick={() => setSelected(i)}
          >
            <span className="date-text">{i}</span>
          </div>
        ) : (
          <div key={`next-${i}`} className="date non-current">
            <span className="date-text">{(i-1) % 10}</span>
          </div>
        )
      );
    }

    return dates;
  };

  return (
    <>
      <h3>Calender</h3>
      <div className="day-headers">{renderHeaders()}</div>
      <div className="dates-grid">{renderDates()}</div>
    </>
  );
};

export default Calendar;
