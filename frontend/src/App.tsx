import HomePageActions from "./components/HomePageActions";
import LeaveContainerList from "./components/LeaveContainerList";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center">
        <HomePageActions />
        <LeaveContainerList />
      </div>
    </>
  );
}

export default App;
