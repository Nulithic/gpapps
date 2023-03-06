import DatePicker from "react-datepicker";
import { forwardRef, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { format, getMonth, getYear } from "date-fns";

import "./DatePicker.css";

interface DateComponentProps {
  inline?: boolean;
  date: Date;
  maxDate?: Date;
  setDate: (date: Date) => void;
}

const ButtonInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <button onClick={onClick} ref={ref} type="button" className="btn btn-mid">
    {format(new Date(value), "MM/dd/yyyy")}
  </button>
));

const DateComponent = ({ inline, date, maxDate, setDate }: DateComponentProps) => {
  const range = (start: number, end: number) => {
    return new Array(end - start).fill("").map((d, i) => i + start);
  };
  const years = range(getYear(new Date()) - 50, getYear(new Date()) + 50);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date ?? new Date())}
      popperClassName="react-datepicker-popper"
      customInput={<ButtonInput />}
      inline={inline}
      maxDate={maxDate}
      showMonthYearDropdown
      todayButton="Today"
      renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
        <div className="flex items-center justify-between px-2 py-2 space-x-1">
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            type="button"
            className={`${prevMonthButtonDisabled && "cursor-not-allowed opacity-50"} inline-flex p-1 btn btn-sm btn-square`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <select
            className="select select-bordered select-sm rounded"
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select className="select select-bordered select-sm rounded" value={getYear(date)} onChange={({ target: { value } }) => changeYear(parseInt(value))}>
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            type="button"
            className={`${nextMonthButtonDisabled && "cursor-not-allowed opacity-50"} inline-flex p-1 btn btn-sm btn-square`}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    />
  );
};

export default DateComponent;
