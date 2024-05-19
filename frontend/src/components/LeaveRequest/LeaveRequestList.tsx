import LeaveRequest from "./LeaveRequest";
import LeaveRequestListHeader from "./LeaveRequestListHeader";
import { useGetLeaveRequestsAll } from "../../hooks/useGetLeaveRequestsAll";
import { LeaveRequestClient, LeaveRequestServer } from "../../types";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetLeaveRequestsUser } from "../../hooks/useGetLeaveRequestsUser";
import LeaveRequestListActions from "./LeaveRequestListActions";
import { Skeleton } from "../Ui/Skeleton";

export default function LeaveRequestList() {
  const [leaveRequestsSearched, setLeaveRequestsSearched] = useState<
    LeaveRequestServer[] | null
  >(null);
  const { isAdmin, userId } = useContext(AuthContext);
  const {
    leaveRequestsAll,
    refetchLeaveRequestsAll,
    isGetLeaveRequestsAllLoading,
  } = useGetLeaveRequestsAll();
  const {
    leaveRequestsUser,
    refetchLeaveRequestsUser,
    isGetLeaveRequestsUserLoading,
  } = useGetLeaveRequestsUser(userId);

  const [sortStartDates, setSortStartDates] = useState<boolean>(false);
  const [sortEndDates, setSortEndDates] = useState<boolean>(false);

  const hasSearched = leaveRequestsSearched && leaveRequestsSearched.length > 0;

  let leaveRequests = isAdmin ? leaveRequestsAll : leaveRequestsUser;
  leaveRequests = hasSearched ? leaveRequestsSearched : leaveRequests;

  const refetchLeaveRequests = isAdmin
    ? refetchLeaveRequestsAll
    : refetchLeaveRequestsUser;

  const isGetLeaveRequestsLoading = isAdmin
    ? isGetLeaveRequestsAllLoading
    : isGetLeaveRequestsUserLoading;

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

  const sortedByEndDate = requests
    .slice()
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );
  const sortedByStartDate = requests
    .slice()
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

  console.log("all loading component", isGetLeaveRequestsAllLoading);
  console.log("loading component", isGetLeaveRequestsLoading);

  return (
    <div className="flex flex-col items-center">
      <LeaveRequestListActions
        setLeaveRequestsSearched={setLeaveRequestsSearched}
      />

      {requests.length > 0 ? (
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <LeaveRequestListHeader
            sortStartDates={sortStartDates}
            setSortStartDates={setSortStartDates}
            sortEndDates={sortEndDates}
            setSortEndDates={setSortEndDates}
          />
          {sortStartDates ? (
            <div className="flex flex-col w-full items-center justify-center gap-2">
              {sortedByStartDate.map((leaveRequest: LeaveRequestClient) => (
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
          ) : sortEndDates ? (
            <div className="flex flex-col w-full items-center justify-center gap-2">
              {sortedByEndDate.map((leaveRequest: LeaveRequestClient) => (
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
          ) : (
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
          )}
        </div>
      ) : isGetLeaveRequestsLoading ? (
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <Skeleton
            className="sticky top-56 h-10 flex flex-row bg-white text-center font-semibold shadow-custom border w-3/4 justify-between px-10 py-2"
            aria-label="loading leave request header"
          />
          <Skeleton
            className="flex flex-col justify-center h-20 w-3/4 bg-white  border rounded-md"
            aria-label="loading leave request"
          />
          <Skeleton
            className="flex flex-col justify-center h-20 w-3/4 bg-white  border rounded-md"
            aria-label="loading leave request"
          />
          <Skeleton
            className="flex flex-col justify-center h-20 w-3/4 bg-white  border rounded-md"
            aria-label="loading leave request"
          />
          <Skeleton
            className="flex flex-col justify-center h-20 w-3/4 bg-white  border rounded-md"
            aria-label="loading leave request"
          />
          <Skeleton
            className="flex flex-col justify-center h-20 w-3/4 bg-white  border rounded-md"
            aria-label="loading leave request"
          />
          <Skeleton
            className="flex flex-col justify-center h-20 w-3/4 bg-white  border rounded-md"
            aria-label="loading leave request"
          />
        </div>
      ) : (
        <h3 className="text-center opacity-70 text-2xl font-semibold mt-40">
          No Leave Requests found
        </h3>
      )}
    </div>
  );
}
