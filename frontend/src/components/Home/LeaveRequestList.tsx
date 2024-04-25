import LeaveRequest from "./LeaveRequest";
import { users, User } from "../../data/users";
import LeaveRequestListHeader from "./LeaveRequestListHeader";

export default function LeaveRequestList() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-2">
      <LeaveRequestListHeader />
      {users.map((user: User) => (
        <LeaveRequest
          key={user.id}
          id={user.id}
          name={user.name}
          leaveType={user.leaveType}
          startDate={user.startDate}
          returnDate={user.returnDate}
          status={user.status}
        />
      ))}
    </div>
  );
}
