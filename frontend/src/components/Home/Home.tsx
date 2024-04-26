import HomePageActions from "./HomePageActions";
import LeaveRequestList from "./LeaveRequestList";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HomePageActions />
      <LeaveRequestList />
    </div>
  );
}
