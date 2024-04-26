import { Button } from "../Ui/Button";
import { Textarea } from "../Ui/TextArea";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "../Ui/DatePicker";
import DropDown from "../Ui/Select";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../Ui/Input";
import { useGetLeaveRequest } from "../../hooks/useGetLeaveRequest";
import { useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGetUser } from "../../hooks/useGetUser";
import { useUpdateLeaveRequest } from "../../hooks/useUpdateLeaveRequest";
import { LoadingSpinner } from "../Ui/LoadingSpinner";
import { useToast } from "../../hooks/useToast";

const leaveRequestSchema = z
  .object({
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

export default function EditLeaveRequest() {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const { userData } = useGetUser(userId);
  const {
    leaveRequest,
    errorGettingLeaveRequest,
    isGetLeaveRequestLoading,
    isGetLeaveRequestSuccess,
  } = useGetLeaveRequest(id);
  const {
    updateLeaveRequest,
    isUpdateLeaveRequestPending,
    isUpdateLeaveRequestSuccess,
    errorUpdatingLeaveRequest,
  } = useUpdateLeaveRequest();

  const defaultLeaveRequestData = {
    startDate: new Date().getTime(),
    endDate: new Date().getTime(),
    type: "",
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
    reset,
    watch,
  } = methods;

  const { startDate, endDate, type, reason } = getValues();
  console.log("values", getValues());
  console.log("watch", watch());

  function timeInDays(start: number, end: number) {
    const timeInSeconds = end - start;
    if (timeInSeconds < 0) return 0;
    return (timeInSeconds / 60 / 60 / 24 / 1000).toFixed(2);
  }

  const handleUpdateLeaveRequest = () => {
    console.log("updating");
    const leaveRequestUpdate = {
      userId: userId,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      type,
      reason,
    };

    updateLeaveRequest({ leaveRequestUpdate, id });
  };

  useEffect(() => {
    if (leaveRequest) {
      const defaultLeaveRequestData = {
        startDate: new Date(leaveRequest.start_date).getTime(),
        endDate: new Date(leaveRequest.end_date).getTime(),
        type: leaveRequest.type,
        reason: leaveRequest.reason,
      };

      reset(defaultLeaveRequestData);
    }
  }, [leaveRequest, isGetLeaveRequestSuccess]);

  useEffect(() => {
    if (isUpdateLeaveRequestSuccess) {
      toast({
        title: "Leave request updated",
        description: "Your leave request has been updated successfully",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (errorUpdatingLeaveRequest) {
      toast({
        title: "Error updating leave request",
        description: "An error occurred while updating your leave request",
      });
    }
  }, [isUpdateLeaveRequestSuccess, errorUpdatingLeaveRequest]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <Button
        className="absolute left-2 top-2 bg-transparent text-darkBlue text-lg border-none hover:bg-transparent hover:underline"
        onClick={() => navigate("/")}
      >
        <ChevronLeft /> Back
      </Button>
      {isGetLeaveRequestLoading ? (
        <div className="flex flex-col items-center justify-center bg-white border gap-4 w-1/2 h-[600px] mt-24 shadow-custom p-4">
          <LoadingSpinner className="h-12 w-12" />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            className="flex flex-col items-center justify-start bg-white border gap-4 w-1/2 h-[600px] mt-24 shadow-custom p-4"
            onSubmit={handleSubmit(handleUpdateLeaveRequest)}
          >
            <h1 className="text-3xl font-bold text-darkBlue mt-6">
              Edit Leave Request
            </h1>
            <div className="flex flex-row items-center gap-4">
              <Input className="w-72" label="Employee" value={userData.name} />

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
            {startDate && endDate && (
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
            )}
            <h3 className="font-semibold">
              Total days: {timeInDays(startDate, endDate)}
            </h3>

            <Textarea
              {...register("reason")}
              className="w-[592px] h-36"
              label="Reason"
            />

            <Button type="submit" className="w-72 mt-6">
              {isUpdateLeaveRequestPending ? <LoadingSpinner /> : "Save"}
            </Button>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
