import LeaveContainer from "./LeaveContainer";
import { users, User } from "../../data/users";
import LeaveContainerListHeader from "./LeaveContainerListHeader";

export default function LeaveContainerList() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-2">
      <LeaveContainerListHeader />
      {users.map((user: User) => (
        <LeaveContainer
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
