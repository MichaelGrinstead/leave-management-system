import { Input } from "./Input";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
export default function SearchBar({
  searchTerm,
  setSearchTerm,
  ...props
}: SearchBarProps) {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: { target: any }) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchTerm("");
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [searchTerm]);

  return (
    <div className="flex-flex col bg-white border rounded-md" ref={searchRef}>
      <div className="flex flex-row items-center justify-center ">
        <div className="flex flex-col items-center w-6 px-4 h-full">
          <Search className="h-4 w-4 text-midBlue" />
        </div>
        <Input
          className="shadow-none border-none w-44"
          placeholder="Search Requests"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          {...props}
        />
      </div>
    </div>
  );
}
