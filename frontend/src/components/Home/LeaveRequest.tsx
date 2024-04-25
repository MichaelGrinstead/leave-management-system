import { Button } from "../Ui/Button";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useGetUser } from "../../hooks/useGetUser";
import LeaveRequestActions from "./LeaveRequestActions";

interface LeaveRequestProps {
  id: number;
  userId: string;
  leaveType: string;
  startDate: string;
  returnDate: string;
  status: string;
}

export default function LeaveRequest({
  id,
  userId,
  leaveType,
  startDate,
  returnDate,
  status,
}: LeaveRequestProps) {
  const { isAdmin } = useContext(AuthContext);
  const { userData } = useGetUser(userId);

  return (
    <div className="flex flex-col justify-center h-20 w-3/4 bg-white  border rounded-md">
      <div className="flex flex-row items-center justify-between px-10 py-2 text-center">
        <h3 className="min-w-8">{id}</h3>
        <h3 className="min-w-32">{userData.name}</h3>
        <h3 className="min-w-32">{leaveType}</h3>
        <h3 className="min-w-32">{startDate}</h3>
        <h3 className="min-w-32">{returnDate}</h3>
        <h3 className="min-w-32">{status}</h3>
        {isAdmin && (
          <div className="min-w-12">
            <LeaveRequestActions />
          </div>
        )}
      </div>
    </div>
  );
}
