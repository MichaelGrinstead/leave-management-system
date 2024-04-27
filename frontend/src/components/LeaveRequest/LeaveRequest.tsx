import { useGetUser } from "../../hooks/useGetUser";
import { clx } from "../../utils/clx";
import LeaveRequestActions from "./LeaveRequestActions";

interface LeaveRequestProps {
  id: number;
  userId: string | undefined;
  leaveType: string;
  startDate: string;
  returnDate: string;
  status: string | undefined;
  refetchLeaveRequests: () => void;
}

export default function LeaveRequest({
  id,
  userId,
  leaveType,
  startDate,
  returnDate,
  status,
  refetchLeaveRequests,
}: LeaveRequestProps) {
  const { userData } = useGetUser(userId);

  const statusColor =
    status === "accepted"
      ? "text-green-600"
      : status === "pending"
      ? "black"
      : "text-red-600";

  return (
    <div className="flex flex-col justify-center h-20 w-3/4 bg-white  border rounded-md">
      <div className="flex flex-row items-center justify-between px-10 py-2 text-center">
        <h3 className="min-w-8">{id}</h3>
        <h3 className="min-w-32 font-semibold">{userData.name}</h3>
        <h3 className="min-w-32">{leaveType}</h3>
        <h3 className="min-w-32">{startDate}</h3>
        <h3 className="min-w-32">{returnDate}</h3>
        <h3 className={clx("min-w-32 font-semibold", statusColor)}>{status}</h3>

        <div className="min-w-24">
          <LeaveRequestActions
            id={id}
            refetchLeaveRequests={refetchLeaveRequests}
          />
        </div>
      </div>
    </div>
  );
}
