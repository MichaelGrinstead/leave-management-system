import { ArrowUpDown } from "lucide-react";
import { Tooltip } from "../Ui/Tooltip";

interface LeaveRequestListHeaderProps {
  sortStartDates: boolean;
  setSortStartDates: React.Dispatch<React.SetStateAction<boolean>>;
  sortEndDates: boolean;
  setSortEndDates: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LeaveRequestListHeader({
  sortStartDates,
  setSortStartDates,
  sortEndDates,
  setSortEndDates,
}: LeaveRequestListHeaderProps) {
  return (
    <div className="sticky top-56 flex flex-row bg-white text-center font-semibold shadow-custom border w-3/4 justify-between px-10 py-2">
      <h3 className="min-w-8">Id</h3>
      <h3 className="min-w-32">Employee Name</h3>
      <h3 className="min-w-32">Leave Type</h3>
      <div className="flex flex-row justify-center items-center gap-2 min-w-32">
        <h3>Start Date</h3>
        <button onClick={() => setSortStartDates(!sortStartDates)}>
          <Tooltip content="Sort by Start Date">
            <ArrowUpDown
              className="text-darkBlue hover:brightness-150"
              size={18}
            />
          </Tooltip>
        </button>
      </div>
      <div className="flex flex-row justify-center items-center gap-2 min-w-32">
        <h3>End Date</h3>
        <button onClick={() => setSortEndDates(!sortEndDates)}>
          <Tooltip content="Sort by End Date">
            <ArrowUpDown
              className="text-darkBlue hover:brightness-150"
              size={18}
            />
          </Tooltip>
        </button>
      </div>
      <h3 className="min-w-32">Status</h3>
      <div className="min-w-32">Actions</div>
    </div>
  );
}
