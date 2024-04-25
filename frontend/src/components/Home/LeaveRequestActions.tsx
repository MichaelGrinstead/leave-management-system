import { FilePenLine, CircleCheck, CircleX } from "lucide-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useUpdateStatus } from "../../hooks/useUpdateStatus";

interface LeaveRequestActionsProps {
  id: number;
  refetchLeaveRequests: () => void;
}

export default function LeaveRequestActions({
  id,
  refetchLeaveRequests,
}: LeaveRequestActionsProps) {
  const { isAdmin } = useContext(AuthContext);
  const { updateStatus, isUpdateStatusSuccess } = useUpdateStatus();

  useEffect(() => {
    if (isUpdateStatusSuccess) {
      refetchLeaveRequests();
    }
  }, [isUpdateStatusSuccess]);

  return (
    <div className="flex flex-row items-center justify-center gap-2 ">
      <button>
        <FilePenLine className="text-midBlue" size={24} />
      </button>
      {isAdmin && (
        <button onClick={() => updateStatus({ status: "accepted", id })}>
          <CircleCheck className="text-green-500" size={24} />
        </button>
      )}
      {isAdmin && (
        <button onClick={() => updateStatus({ status: "denied", id })}>
          <CircleX className="text-red-500" size={24} />
        </button>
      )}
    </div>
  );
}
