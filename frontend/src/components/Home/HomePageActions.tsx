import { Button } from "../Ui/Button";
import SearchBar from "../Ui/SearchBar";
import { useNavigate } from "react-router-dom";

export default function HomePageActions() {
  const navigate = useNavigate();
  return (
    <div className="sticky top-12 w-3/4 h-44 flex flex-col justify-end z-60 bg-coolGrey">
      <div className="flex flex-row items-center justify-between pb-4">
        <h3 className="text-xl font-semibold">Leave Requests</h3>
        <div className="flex flex-row gap-4">
          <SearchBar />
          <Button onClick={() => navigate("/create-leave-request")}>
            Create Leave Request
          </Button>
        </div>
      </div>
    </div>
  );
}
