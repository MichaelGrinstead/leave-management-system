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
import { useCheckDateOverlap } from "../../hooks/useCheckDateOverlap";
import { adjustForTimezone } from "../../utils/adjustForTimezone";

const leaveRequestSchema = z
  .object({
    startDate: z.number(),
    endDate: z.number(),
    type: z.string().min(1, { message: "Type is required" }),
    reason: z.string().min(1, { message: "Reason is required" }),
  })
  .refine((data) => data.startDate < data.endDate, {
    message: "End date must come after start date",
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
    trigger,
  } = methods;

  console.log(errors);

  const { employee, type } = getValues();

  const { startDate, endDate } = watch();
  const { isOverlap, refetchCheckOverlap } = useCheckDateOverlap(
    new Date(startDate).toISOString(),
    new Date(endDate).toISOString()
  );

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
        startDate: adjustForTimezone(new Date(startDate)).toISOString(),
        endDate: adjustForTimezone(new Date(endDate)).toISOString(),
        reason: getValues().reason,
      });
    } else {
      addLeaveRequest({
        type: type,
        startDate: adjustForTimezone(new Date(startDate)).toISOString(),
        endDate: adjustForTimezone(new Date(endDate)).toISOString(),
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

  useEffect(() => {
    refetchCheckOverlap;
  }, [startDate, endDate]);

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
          <div className="flex flex-col">
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
                setDate={(endDate: Date | undefined) => {
                  endDate && setValue("endDate", endDate.getTime()),
                    trigger("endDate");
                }}
              />
            </div>
            {errors.endDate ? (
              <h6 className="text-red-600 m-auto py-1 font-semibold">
                {errors.endDate?.message}
              </h6>
            ) : isOverlap?.overlap ? (
              <h6 className="text-red-600 m-auto py-1 font-semibold">
                Your chosen date overlaps with another leave request
              </h6>
            ) : (
              <div className="h-6 py-1"></div>
            )}
            <h3 className="font-semibold m-auto">
              Total days: {timeInDays(startDate, endDate)}
            </h3>
          </div>

          <Textarea
            {...register("reason")}
            className="w-[592px] h-36"
            label="Reason"
            error={errors.reason && errors.reason.message}
          />

          <Button className="w-72 mt-6">
            {isAddLeaveRequestPending ? <LoadingSpinner /> : "Create"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
