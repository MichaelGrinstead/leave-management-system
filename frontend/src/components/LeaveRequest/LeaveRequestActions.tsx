import { FilePenLine, CircleCheck, CircleX, Trash2 } from "lucide-react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useUpdateStatus } from "../../hooks/useUpdateStatus";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "../Ui/Tooltip";
import { useDeleteLeaveRequest } from "../../hooks/useDeleteLeaveRequest";
import { useToast } from "../../hooks/useToast";

interface LeaveRequestActionsProps {
  id: number;
  refetchLeaveRequests: () => void;
}

export default function LeaveRequestActions({
  id,
  refetchLeaveRequests,
}: LeaveRequestActionsProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const { updateStatus, isUpdateStatusSuccess } = useUpdateStatus();
  const { deleteLeaveRequest, isDeleteLeaveRequestSuccess } =
    useDeleteLeaveRequest();

  useEffect(() => {
    if (isUpdateStatusSuccess) {
      toast({
        title: `Leave Request id:${id} status updated`,
        description: "The leave request status has been successfully updated",
      });
      refetchLeaveRequests();
    }
  }, [isUpdateStatusSuccess]);

  useEffect(() => {
    if (isDeleteLeaveRequestSuccess) {
      toast({
        title: "Leave Request Deleted",
        description: "The leave request has been successfully deleted",
      });
      refetchLeaveRequests();
    }
  }, [isDeleteLeaveRequestSuccess]);

  return (
    <div className="flex flex-row items-center justify-center gap-2 ">
      <button onClick={() => navigate(`edit-leave-request/${id}`)}>
        <Tooltip content="Edit">
          <FilePenLine className="text-midBlue" size={24} />
        </Tooltip>
      </button>
      <button onClick={() => deleteLeaveRequest(id)}>
        <Tooltip content="Delete">
          <Trash2 className="text-darkBlue" size={24} />
        </Tooltip>
      </button>

      {isAdmin && (
        <button onClick={() => updateStatus({ status: "Accepted", id })}>
          <Tooltip content="Accept">
            <CircleCheck className="text-green-600" size={24} />
          </Tooltip>
        </button>
      )}
      {isAdmin && (
        <button onClick={() => updateStatus({ status: "Denied", id })}>
          <Tooltip content="Deny">
            <CircleX className="text-red-600" size={24} />
          </Tooltip>
        </button>
      )}
    </div>
  );
}
