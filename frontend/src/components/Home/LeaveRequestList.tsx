import LeaveRequest from "./LeaveRequest";
import LeaveRequestListHeader from "./LeaveRequestListHeader";
import { useGetLeaveRequestsAll } from "../../hooks/useGetLeaveRequestsAll";
import { LeaveRequestClient, LeaveRequestServer } from "../../types";

export default function LeaveRequestList() {
  const { leaveRequests } = useGetLeaveRequestsAll();

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

  console.log(leaveRequests);
  return (
    <div className="flex flex-col w-full items-center justify-center gap-2">
      <LeaveRequestListHeader />
      {requests.map((leaveRequest: LeaveRequestClient) => (
        <LeaveRequest
          key={leaveRequest.id}
          id={leaveRequest.id}
          userId={leaveRequest.userId.toString()}
          leaveType={leaveRequest.type}
          startDate={leaveRequest.startDate}
          returnDate={leaveRequest.endDate}
          status={leaveRequest.status}
        />
      ))}
    </div>
  );
}
