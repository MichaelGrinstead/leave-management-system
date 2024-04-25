import HomePageActions from "./HomePageActions";
import LeaveContainerList from "./LeaveRequestList";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HomePageActions />
      <LeaveContainerList />
    </div>
  );
}
