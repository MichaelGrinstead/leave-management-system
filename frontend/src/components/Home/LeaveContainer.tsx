import { Button } from "../ui/Button";

interface LeaveContainerProps {
  id: number;
  name: string;
  leaveType: string;
  startDate: string;
  returnDate: string;
  status: string;
}

export default function LeaveContainer({
  id,
  name,
  leaveType,
  startDate,
  returnDate,
  status,
}: LeaveContainerProps) {
  return (
    <div className="flex flex-col justify-center h-20 w-3/4 bg-white  border rounded-md">
      <div className="flex flex-row items-center justify-between px-10 py-2 text-center">
        <h3 className="min-w-8">{id}</h3>
        <h3 className="min-w-32">{name}</h3>
        <h3 className="min-w-32">{leaveType}</h3>
        <h3 className="min-w-32">{startDate}</h3>
        <h3 className="min-w-32">{returnDate}</h3>
        <h3 className="min-w-32">{status}</h3>
        <div className="min-w-12">
          <Button>edit</Button>
        </div>
      </div>
    </div>
  );
}
