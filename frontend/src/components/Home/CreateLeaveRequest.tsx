import { Button } from "../Ui/Button";
import { Textarea } from "../Ui/TextArea";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DatePicker } from "../Ui/DatePicker";
import DropDown from "../Ui/Select";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetUser } from "../../hooks/useGetUser";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetUsers } from "../../hooks/useGetUsers";
import { Input } from "../Ui/Input";
import { useAddLeaveRequest } from "../../hooks/useAddLeaveRequest";
import { useToast } from "../../hooks/useToast";
import { LoadingSpinner } from "../Ui/LoadingSpinner";

const leaveRequestSchema = z
  .object({
    employee: z.object({}),
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
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin, userId } = useContext(AuthContext);
  const { userData } = useGetUser(userId);
  const { usersData } = useGetUsers();
  const employees = usersData.map((user) => {
    return { name: user.name, id: user.id.toString() };
  });
  const {
    addLeaveRequest,
    isAddLeaveRequestPending,
    isAddLeaveRequestSuccess,
    errorAddingLeaveRequest,
  } = useAddLeaveRequest();

  console.log(usersData);

  const defaultLeaveRequestData = {
    employee: isAdmin
      ? employees.length > 0
        ? employees[0]
        : ""
      : { name: userData.name || "", id: userId || "" },
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
    handleSubmit,
    watch,
  } = methods;

  const { employee, type } = getValues();

  const { startDate, endDate } = watch();

  function timeInDays(start: number, end: number) {
    const timeInSeconds = end - start;
    if (timeInSeconds < 0) return 0;
    return (timeInSeconds / 60 / 60 / 24 / 1000).toFixed(2);
  }

  const handleCreateLeaveRequest = () => {
    if (isAdmin) {
      addLeaveRequest({
        userId: typeof employee === "object" ? employee.id : "",
        type: type,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        reason: getValues().reason,
      });
    } else {
      addLeaveRequest({
        type: type,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        reason: getValues().reason,
      });
    }
  };

  useEffect(() => {
    if (isAddLeaveRequestSuccess) {
      toast({
        title: "Leave request created",
        description: "Your leave request was created successfully",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (errorAddingLeaveRequest) {
      toast({
        title: "Error",
        description: "There was an error creating the leave request",
      });
    }
  }, [isAddLeaveRequestSuccess, errorAddingLeaveRequest]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <Button
        className="absolute left-2 top-2 bg-transparent text-darkBlue text-lg border-none hover:bg-transparent hover:underline"
        onClick={() => navigate("/")}
      >
        <ChevronLeft /> Back
      </Button>
      <FormProvider {...methods}>
        <form
          className="flex flex-col items-center justify-start bg-white border gap-4 w-1/2 h-[600px] mt-24 shadow-custom p-4"
          onSubmit={handleSubmit(handleCreateLeaveRequest)}
        >
          <h1 className="text-3xl font-bold text-darkBlue mt-6">
            Create Leave Request
          </h1>
          <div className="flex flex-row items-center gap-4">
            {isAdmin ? (
              <DropDown
                label="Employee"
                placeholder={
                  typeof employee === "object" ? employee.name : "Employee"
                }
                options={employees}
                onValueChange={(value) => {
                  if (typeof value === "object") {
                    setValue("employee", value);
                  }
                }}
              />
            ) : (
              <Input className="w-72" label="Employee" value={userData.name} />
            )}
            <DropDown
              label="Leave Type"
              placeholder={type}
              options={leaveTypes}
              onValueChange={(value) => {
                if (typeof value === "string") {
                  setValue("type", value);
                }
              }}
            />
          </div>
          <div className="flex flex-row gap-4">
            <DatePicker
              label="Start date"
              date={new Date(startDate)}
              setDate={(startDate: Date | undefined) => {
                console.log("setting date"),
                  startDate && setValue("startDate", startDate.getTime());
              }}
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

          <Button className="w-72 mt-6">
            {isAddLeaveRequestPending ? <LoadingSpinner /> : "Create"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
