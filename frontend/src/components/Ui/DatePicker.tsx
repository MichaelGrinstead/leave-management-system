import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { clx } from "../../utils/clx";

import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

interface DatePickerProps {
  label: string;
  date: Date;
  setDate: (date: Date | undefined) => void;
}

export function DatePicker({ label, date, setDate }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col">
          <h6>{label}</h6>
          <Button
            type="button"
            className={clx(
              "w-72 bg-white border-2 text-black justify-start text-left font-normal hover:bg-gray-100",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className="bg-white"
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            console.log("selected"), setDate(selectedDate);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
