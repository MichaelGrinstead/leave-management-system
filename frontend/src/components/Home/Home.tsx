import HomePageActions from "./HomePageActions";
import LeaveContainerList from "./LeaveContainerList";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HomePageActions />
      <LeaveContainerList />
    </div>
  );
}
