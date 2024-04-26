import { Tooltip } from "./Tooltip";
import { Eye } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface ShowPasswordProps {
  isShowPassword: boolean;
  setIsShowPassword: Dispatch<SetStateAction<boolean>>;
}

export default function ShowPassword({
  isShowPassword,
  setIsShowPassword,
}: ShowPasswordProps) {
  return (
    <div className="absolute flex items-center justify-center right-1 top-2">
      <Tooltip content="Show Password">
        <Eye
          className="border-none h-6 w-6 text-gray-500  pr-1 rounded-full"
          size={16}
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      </Tooltip>
    </div>
  );
}
