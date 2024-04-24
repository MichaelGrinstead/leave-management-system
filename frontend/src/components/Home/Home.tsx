import HomePageActions from "./HomePageActions";
import LeaveContainerList from "./LeaveContainerList";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Home() {
  const { token, userId } = useContext(AuthContext);
  const localToken = localStorage.getItem("token");
  const localUserId = localStorage.getItem("user_id");

  console.log("context", { token, userId });
  console.log("storage", { localToken, localUserId });
  return (
    <div className="flex flex-col items-center">
      <HomePageActions />
      <LeaveContainerList />
    </div>
  );
}
