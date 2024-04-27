import { useQuery } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API_URL as string;
const route = `${apiUrl}/check-date-overlap`;

export const useCheckDateOverlap = (
  startDate: string,
  endDate: string
): {
  isOverlap: { overlap: boolean } | null;
  isCheckDateOverlapLoading: boolean;
  isCheckDateOverlapSuccess: boolean;
  errorCheckingDateOverlap: Error | null;
  refetchCheckOverlap: () => void;
} => {
  const {
    data: isOverlap,
    isLoading: isCheckDateOverlapLoading,
    isSuccess: isCheckDateOverlapSuccess,
    error: errorCheckingDateOverlap,
    refetch: refetchCheckOverlap,
  } = useQuery({
    queryKey: ["checkOverlap", startDate, endDate],
    queryFn: async () => {
      const response = await fetch(
        `${route}?startDate=${startDate}&endDate=${endDate}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    },
    enabled: !!startDate && !!endDate,
  });

  return {
    isOverlap,
    isCheckDateOverlapLoading,
    isCheckDateOverlapSuccess,
    errorCheckingDateOverlap,
    refetchCheckOverlap,
  };
};
