import { Button } from "./ui/Button";
import SearchBar from "./ui/SearchBar";

export default function HomePageActions() {
  return (
    <div className="sticky top-12 w-3/4 h-44 flex flex-col justify-end z-60 bg-coolGrey">
      <div className="flex flex-row items-center justify-between pb-4">
        <h3 className="text-xl font-semibold">Leave Requests</h3>
        <div className="flex flex-row gap-4">
          <SearchBar />
          <Button className="">Create Leave Request</Button>
        </div>
      </div>
    </div>
  );
}
