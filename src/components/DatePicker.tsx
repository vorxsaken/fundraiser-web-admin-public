import { Calendar } from "primereact/calendar";

import { forwardRef, useState } from "react";

interface DatePickerInterface {
  errors: any;
  fieldName: string;
  labelHelper: string;
  value: Date;
  onChange: (e: any) => void;
}

const DatePicker = forwardRef(
  (
    {
      errors,
      fieldName,
      labelHelper,
      onChange,
      value,
    }: DatePickerInterface,
    ref
  ) => {
    const [dateVal, setDateval] = useState(value || null);
    const error = errors[fieldName]?.message;

    const date = (e: any) => {
      const newDate = new Date(e);
      setDateval(newDate);
      onChange(newDate)
    };

    return (
      <>
        <div className="w-full flex flex-col justify-center items-start gap-2 ">
          <Calendar
            className={`w-full p-4 border rounded-md ${error ? 'border-red-500' : 'border-slate-500'}`}
            value={dateVal}
            touchUI
            onChange={(e) => date(e.value as any)}
            placeholder="Tenggat Waktu"
          />
          {error ? (
            <span className="text-xs ml-1 text-red-500">{error}</span>
          ) : (
            <span className="text-xs ml-1 text-gray-700">
              {labelHelper}
            </span>
          )}
        </div>
      </>
    );
  }
);

export default DatePicker;
