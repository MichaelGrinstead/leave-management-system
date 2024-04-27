import LeaveRequest from "./LeaveRequest";
import LeaveRequestListHeader from "./LeaveRequestListHeader";
import { useGetLeaveRequestsAll } from "../../hooks/useGetLeaveRequestsAll";
import { LeaveRequestClient, LeaveRequestServer } from "../../types";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetLeaveRequestsUser } from "../../hooks/useGetLeaveRequestsUser";
import LeaveRequestListActions from "./LeaveRequestListActions";

export default function LeaveRequestList() {
  const [leaveRequestsSearched, setLeaveRequestsSearched] = useState<
    LeaveRequestServer[] | null
  >(null);
  const { isAdmin, userId } = useContext(AuthContext);
  const { leaveRequestsAll, refetchLeaveRequestsAll } =
    useGetLeaveRequestsAll();
  const { leaveRequestsUser, refetchLeaveRequestsUser } =
    useGetLeaveRequestsUser(userId);

  const hasSearched = leaveRequestsSearched && leaveRequestsSearched.length > 0;

  let leaveRequests = isAdmin ? leaveRequestsAll : leaveRequestsUser;
  leaveRequests = hasSearched ? leaveRequestsSearched : leaveRequests;

  const refetchLeaveRequests = isAdmin
    ? refetchLeaveRequestsAll
    : refetchLeaveRequestsUser;

  console.log("searched", leaveRequestsSearched);

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
    <div className="flex flex-col items-center">
      <LeaveRequestListActions
        setLeaveRequestsSearched={setLeaveRequestsSearched}
      />

      {requests.length > 0 ? (
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <LeaveRequestListHeader />
          <div className="flex flex-col w-full items-center justify-center gap-2">
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
        </div>
      ) : (
        <h3 className="text-center text-2xl font-semibold mt-12">
          No leave requests found
        </h3>
      )}
    </div>
  );
}
