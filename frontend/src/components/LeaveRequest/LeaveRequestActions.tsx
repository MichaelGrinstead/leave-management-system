import { FilePenLine, CircleCheck, CircleX } from "lucide-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useUpdateStatus } from "../../hooks/useUpdateStatus";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "../Ui/Tooltip";

interface LeaveRequestActionsProps {
  id: number;
  refetchLeaveRequests: () => void;
}

export default function LeaveRequestActions({
  id,
  refetchLeaveRequests,
}: LeaveRequestActionsProps) {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const { updateStatus, isUpdateStatusSuccess } = useUpdateStatus();

  useEffect(() => {
    if (isUpdateStatusSuccess) {
      refetchLeaveRequests();
    }
  }, [isUpdateStatusSuccess]);

  return (
    <div className="flex flex-row items-center justify-center gap-2 ">
      <button onClick={() => navigate(`edit-leave-request/${id}`)}>
        <Tooltip content="Edit">
          <FilePenLine className="text-midBlue" size={24} />
        </Tooltip>
      </button>
      {isAdmin && (
        <button onClick={() => updateStatus({ status: "accepted", id })}>
          <Tooltip content="Accept">
            <CircleCheck className="text-green-600" size={24} />
          </Tooltip>
        </button>
      )}
      {isAdmin && (
        <button onClick={() => updateStatus({ status: "denied", id })}>
          <Tooltip content="Deny">
            <CircleX className="text-red-600" size={24} />
          </Tooltip>
        </button>
      )}
    </div>
  );
}
