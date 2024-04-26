import LeaveRequest from "./LeaveRequest";
import LeaveRequestListHeader from "./LeaveRequestListHeader";
import { useGetLeaveRequestsAll } from "../../hooks/useGetLeaveRequestsAll";
import { LeaveRequestClient, LeaveRequestServer } from "../../types";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetLeaveRequestsUser } from "../../hooks/useGetLeaveRequestsUser";

export default function LeaveRequestList() {
  const { isAdmin, userId } = useContext(AuthContext);
  const { leaveRequestsAll, refetchLeaveRequestsAll } =
    useGetLeaveRequestsAll();
  const { leaveRequestsUser, refetchLeaveRequestsUser } =
    useGetLeaveRequestsUser(userId);

  const leaveRequests = isAdmin ? leaveRequestsAll : leaveRequestsUser;
  const refetchLeaveRequests = isAdmin
    ? refetchLeaveRequestsAll
    : refetchLeaveRequestsUser;

  const requests: LeaveRequestClient[] = leaveRequests.map(
    (request: LeaveRequestServer) => {
      return {
        id: request.id,
        userId: request.user_id.toString(),
        type: request.type,
        startDate: request.start_date,
        endDate: request.end_date,
        reason: request.reason,
        status: request.status,
      };
    }
  );

  return (
    <div className="flex flex-col w-full items-center justify-center gap-2">
      <LeaveRequestListHeader />
      {requests.map((leaveRequest: LeaveRequestClient) => (
        <LeaveRequest
          key={leaveRequest.id}
          id={leaveRequest.id}
          userId={leaveRequest.userId && leaveRequest.userId.toString()}
          leaveType={leaveRequest.type}
          startDate={leaveRequest.startDate}
          returnDate={leaveRequest.endDate}
          status={leaveRequest.status}
          refetchLeaveRequests={refetchLeaveRequests}
        />
      ))}
    </div>
  );
}
