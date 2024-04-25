import { FilePenLine, CircleCheck, CircleX } from "lucide-react";

export default function LeaveRequestActions() {
  return (
    <div className="flex flex-row gap-2 ">
      <FilePenLine className="text-midBlue" size={24} />
      <CircleCheck className="text-green-500" size={24} />
      <CircleX className="text-red-500" size={24} />
    </div>
  );
}
