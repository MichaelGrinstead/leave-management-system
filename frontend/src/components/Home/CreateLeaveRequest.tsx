import { Button } from "../Ui/Button";
import { Textarea } from "../Ui/TextArea";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DatePicker } from "../Ui/DatePicker";
import DropDown from "../Ui/Select";
import { employees } from "../../data/users";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetUser } from "../../hooks/useGetUser";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const leaveRequestSchema = z
  .object({
    employee: z.string().min(1, { message: "Employee is required" }),
    startDate: z.number(),
    endDate: z.number(),
    type: z.string().min(1, { message: "Type is required" }),
    reason: z.string().min(1, { message: "Reason is required" }),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "Start date must be before end date",
    path: ["endDate"],
  });

const leaveTypes = ["Personal", "Sick", "Vacation", "Bereavement"];

export default function CreateLeaveRequest() {
  const navigate = useNavigate();
  const { isAdmin, userId } = useContext(AuthContext);
  const { userData } = useGetUser(userId);

  const defaultLeaveRequestData = {
    employee: isAdmin ? employees[0] : userData.name,
    startDate: new Date().getTime(),
    endDate: new Date().getTime(),
    type: "Personal",
    reason: "",
  };

  const methods = useForm({
    defaultValues: defaultLeaveRequestData,
    resolver: zodResolver(leaveRequestSchema),
  });

  const {
    setValue,
    getValues,
    register,
    formState: { errors },
  } = methods;

  const { employee, startDate, endDate, type } = getValues();

  function timeInDays(start: number, end: number) {
    const timeInSeconds = end - start;
    if (timeInSeconds < 0) return 0;
    return (timeInSeconds / 60 / 60 / 24 / 1000).toFixed(2);
  }

  console.log(getValues());
  console.log(errors);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <Button
        className="absolute left-2 top-2 bg-transparent text-darkBlue text-lg border-none hover:bg-transparent hover:underline"
        onClick={() => navigate("/")}
      >
        <ChevronLeft /> Back
      </Button>
      <FormProvider {...methods}>
        <form className="flex flex-col items-center justify-start bg-white border gap-4 w-1/2 h-[600px] mt-24 shadow-custom p-4">
          <h1 className="text-3xl font-bold text-darkBlue mt-6">
            Create Leave Request
          </h1>
          <div className="flex flex-row gap-4">
            {isAdmin ? (
              <DropDown
                label="Employee"
                placeholder={employee}
                options={employees}
                onValueChange={(value: string) => setValue("employee", value)}
              />
            ) : (
              <h3 className="font-semibold">Employee: {userData.name}</h3>
            )}
            <DropDown
              label="Leave Type"
              placeholder={type}
              options={leaveTypes}
              onValueChange={(value: string) => setValue("type", value)}
            />
          </div>
          <div className="flex flex-row gap-4">
            <DatePicker
              label="Start date"
              date={new Date(startDate)}
              setDate={(startDate: Date | undefined) =>
                startDate && setValue("startDate", startDate.getTime())
              }
            />
            <DatePicker
              label="End date"
              date={new Date(endDate)}
              setDate={(endDate: Date | undefined) =>
                endDate && setValue("endDate", endDate.getTime())
              }
            />
          </div>
          <h3 className="font-semibold">
            Total days: {timeInDays(startDate, endDate)}
          </h3>

          <Textarea
            {...register("reason")}
            className="w-[592px] h-36"
            label="Reason"
          />

          <Button className="w-72 mt-6">Create</Button>
        </form>
      </FormProvider>
    </div>
  );
}
