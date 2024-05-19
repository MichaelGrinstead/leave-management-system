import { screen } from "@testing-library/react";
import LeaveRequestList from "../../../components/LeaveRequest/LeaveRequestList";
import render from "../../utils/renderWithProviders";
import userEvent from "@testing-library/user-event";
import {
  MockAuthProvider,
  mockAuthContextWithAdmin,
  mockAuthContextWithoutAdmin,
} from "../../context/MockAuth";
import { LeaveRequestServer } from "../../../types";

const mockLeaveRequestList: LeaveRequestServer[] = [
  {
    created_at: "2021-09-01",
    end_date: "2021-09-03",
    id: 1,
    reason: "Sick",
    start_date: "2021-09-01",
    status: "Pending",
    type: "Sick Leave",
    updated_at: "2021-09-01",
    user_id: 1,
  },
  {
    created_at: "2021-09-01",
    end_date: "2021-10-22",
    id: 2,
    reason: "Annual Leave",
    start_date: "2021-10-15",
    status: "Approved",
    type: "Vacation",
    updated_at: "2021-09-01",
    user_id: 2,
  },
];

const mockLeaveRequestListUser: LeaveRequestServer[] = [
  {
    created_at: "2021-09-01",
    end_date: "2021-09-03",
    id: 1,
    reason: "Sick",
    start_date: "2021-09-01",
    status: "Pending",
    type: "Sick Leave",
    updated_at: "2021-09-01",
    user_id: 1,
  },
];

let arrayEmpty = false;
let loading = false;

vi.mock("../../../hooks/useGetLeaveRequestsAll", () => ({
  useGetLeaveRequestsAll: () => ({
    leaveRequestsAll: arrayEmpty ? [] : mockLeaveRequestList,
    refetchLeaveRequestsAll: vi.fn(),
    isGetLeaveRequestsAllLoading: loading,
  }),
}));

vi.mock("../../../hooks/useGetLeaveRequestsUser", () => ({
  useGetLeaveRequestsUser: () => ({
    leaveRequestsUser: mockLeaveRequestListUser,
    refetchLeaveRequestsUser: vi.fn(),
    isGetLeaveRequestsUserLoading: loading,
  }),
}));

describe("LeaveRequestList", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    arrayEmpty = false;
    loading = false;
  });

  it("Should not render the list if the array is empty", () => {
    arrayEmpty = true;

    render(
      <MockAuthProvider {...mockAuthContextWithAdmin}>
        <LeaveRequestList />
      </MockAuthProvider>
    );

    expect(screen.getByText("No Leave Requests found")).toBeInTheDocument();
  });

  it("Should render the Skeleton loaders if isGetLeaveRequestsLoading is true", () => {
    arrayEmpty = true;
    loading = true;

    console.log("all loading test", loading);
    render(
      <MockAuthProvider {...mockAuthContextWithAdmin}>
        <LeaveRequestList />
      </MockAuthProvider>
    );

    expect(
      screen.getByLabelText("loading leave request header")
    ).toBeInTheDocument();
    expect(
      screen.getAllByLabelText("loading leave request").length
    ).toBeGreaterThan(0);
  });

  it("Should render the LeaveRequestListActions component", () => {
    render(
      <MockAuthProvider {...mockAuthContextWithAdmin}>
        <LeaveRequestList />
      </MockAuthProvider>
    );

    expect(screen.getByText("Leave Requests")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Create Leave Request" })
    ).toBeInTheDocument();
  });

  it("Should render the LeaveRequestListHeader component", () => {
    render(
      <MockAuthProvider {...mockAuthContextWithAdmin}>
        <LeaveRequestList />
      </MockAuthProvider>
    );

    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Employee Name")).toBeInTheDocument();
    expect(screen.getByText("Leave Type")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("Should render both LeaveRequest components if Admin", () => {
    render(
      <MockAuthProvider {...mockAuthContextWithAdmin}>
        <LeaveRequestList />
      </MockAuthProvider>
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2021-09-01")).toBeInTheDocument();
    expect(screen.getByText("2021-09-03")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Sick Leave")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("2021-10-15")).toBeInTheDocument();
    expect(screen.getByText("2021-10-22")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("Vacation")).toBeInTheDocument();
  });

  it("Should render only the user Leave Request if non admin", () => {
    render(
      <MockAuthProvider {...mockAuthContextWithoutAdmin}>
        <LeaveRequestList />
      </MockAuthProvider>
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2021-09-01")).toBeInTheDocument();
    expect(screen.getByText("2021-09-03")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Sick Leave")).toBeInTheDocument();

    expect(screen.queryByText("2")).not.toBeInTheDocument();
    expect(screen.queryByText("2021-10-15")).not.toBeInTheDocument();
    expect(screen.queryByText("2021-10-22")).not.toBeInTheDocument();
    expect(screen.queryByText("Approved")).not.toBeInTheDocument();
    expect(screen.queryByText("Vacation")).not.toBeInTheDocument();
  });
});
