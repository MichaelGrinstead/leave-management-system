import { screen } from "@testing-library/react";
import LeaveRequest from "../../../components/LeaveRequest/LeaveRequest";
import render from "../../utils/renderWithProviders";

describe("LeaveRequest", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should render the LeaveRequest component with the correct props", () => {
    const props = {
      id: 1,
      userId: "1",
      leaveType: "Sick Leave",
      startDate: "2022-01-01",
      returnDate: "2022-01-02",
      status: "Pending",
      refetchLeaveRequests: vi.fn(),
    };

    vi.mock("../../../hooks/useGetUser", () => ({
      useGetUser: () => ({
        userData: { name: "John Doe" },
      }),
    }));

    render(<LeaveRequest {...props} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Sick Leave")).toBeInTheDocument();
    expect(screen.getByText("2022-01-01")).toBeInTheDocument();
    expect(screen.getByText("2022-01-02")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("should render the LeaveRequest component with the correct status color", () => {
    const props = {
      id: 1,
      userId: "1",
      leaveType: "Sick Leave",
      startDate: "2022-01-01",
      returnDate: "2022-01-02",
      status: "Accepted",
      refetchLeaveRequests: vi.fn(),
    };
    render(<LeaveRequest {...props} />);

    expect(screen.getByText("Accepted")).toHaveClass("text-green-600");

    props.status = "Pending";

    render(<LeaveRequest {...props} />);

    expect(screen.getByText("Pending")).toHaveClass("black");

    props.status = "Rejected";

    render(<LeaveRequest {...props} />);

    expect(screen.getByText("Rejected")).toHaveClass("text-red-600");
  });
});
