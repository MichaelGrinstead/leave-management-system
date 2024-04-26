import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "../Ui/SearchBar";
import { useSearch } from "../../hooks/useSearch";
import { LeaveRequestServer } from "../../types";
import { useDebounce } from "@uidotdev/usehooks";

interface SearchProps {
  setLeaveRequestsSearched: React.Dispatch<
    React.SetStateAction<LeaveRequestServer[] | null>
  >;
}

export default function Search({ setLeaveRequestsSearched }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { leaveRequests, isSearchLoading } = useSearch(debouncedSearchTerm);

  useEffect(() => {
    console.log("requests");
    setLeaveRequestsSearched(leaveRequests);
  }, [debouncedSearchTerm, isSearchLoading]);

  return (
    <SearchBar searchTerm={searchTerm || ""} setSearchTerm={setSearchTerm} />
  );
}
