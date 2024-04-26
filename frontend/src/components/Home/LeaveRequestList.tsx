import LeaveRequest from "./LeaveRequest";
import LeaveRequestListHeader from "./LeaveRequestListHeader";
import { useGetLeaveRequestsAll } from "../../hooks/useGetLeaveRequestsAll";
import { LeaveRequestClient, LeaveRequestServer } from "../../types";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function LeaveRequestList() {
  const { isAdmin, userId } = useContext(AuthContext);
  const { leaveRequests, refetchLeaveRequests } = useGetLeaveRequestsAll();

  const leaveRequestsUnfiltered: LeaveRequestClient[] = leaveRequests.map(
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

  const leaveRequestsFiltered = leaveRequestsUnfiltered.filter((request) => {
    return request.userId === userId?.toString();
  });

  const requests = isAdmin ? leaveRequestsUnfiltered : leaveRequestsFiltered;

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
