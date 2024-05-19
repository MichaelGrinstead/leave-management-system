import { screen } from "@testing-library/react";
import LeaveRequestActions from "../../../components/LeaveRequest/LeaveRequestActions";
import render from "../../utils/renderWithProviders";
import userEvent from "@testing-library/user-event";
import {
  MockAuthProvider,
  mockAuthContextWithAdmin,
  mockAuthContextWithoutAdmin,
} from "../../context/MockAuth";

const mockDeleteLeaveRequest = vi.fn();
const mockUpdateStatus = vi.fn();
const mockNavigate = vi.fn();
const mockRefetchLeaveRequests = vi.fn();

let mockIsDeleteLeaveRequestSuccess = false;
let mockIsUpdateStatusSuccess = false;

const user = userEvent.setup();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../../hooks/useDeleteLeaveRequest", () => ({
  useDeleteLeaveRequest: () => ({
    deleteLeaveRequest: mockDeleteLeaveRequest,
    isDeleteLeaveRequestSuccess: mockIsDeleteLeaveRequestSuccess,
  }),
}));

vi.mock("../../../hooks/useUpdateStatus", () => ({
  useUpdateStatus: () => ({
    updateStatus: mockUpdateStatus,
    isUpdateStatusSuccess: mockIsUpdateStatusSuccess,
  }),
}));

const props = {
  id: 1,
  refetchLeaveRequests: mockRefetchLeaveRequests,
};

describe("LeaveRequestActions", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    mockIsDeleteLeaveRequestSuccess = false;
    mockIsUpdateStatusSuccess = false;
  });
  it("should render the correct LeaveRequestActions buttons for an admin", () => {
    render(
      <MockAuthProvider {...mockAuthContextWithAdmin}>
        <LeaveRequestActions {...props} />
      </MockAuthProvider>
    );

    expect(screen.getByLabelText("Edit Leave Request")).toBeInTheDocument();
    expect(screen.getByLabelText("Delete Leave Request")).toBeInTheDocument();
    expect(screen.getByLabelText("Accept Leave Request")).toBeInTheDocument();
    expect(screen.getByLabelText("Deny Leave Request")).toBeInTheDocument();
  });

  it("should render the correct LeaveRequestActions buttons for a non-admin", () => {
    render(
      <MockAuthProvider {...mockAuthContextWithoutAdmin}>
        <LeaveRequestActions {...props} />
      </MockAuthProvider>
    );

    expect(screen.getByLabelText("Edit Leave Request")).toBeInTheDocument();
    expect(screen.getByLabelText("Delete Leave Request")).toBeInTheDocument();
    expect(
      screen.queryByLabelText("Accept Leave Request")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("Deny Leave Request")
    ).not.toBeInTheDocument();
  });

  it("should display the correct tooltip content", async () => {
    render(
      <MockAuthProvider {...mockAuthContextWithAdmin}>
        <LeaveRequestActions {...props} />
      </MockAuthProvider>
    );

    const editButton = screen.getByLabelText("Edit Leave Request");
    const deleteButton = screen.getByLabelText("Delete Leave Request");
    const acceptButton = screen.getByLabelText("Accept Leave Request");
    const denyButton = screen.getByLabelText("Deny Leave Request");

    await user.hover(editButton);
    expect(await screen.findAllByText("Edit")).toHaveLength(2);

    await user.hover(deleteButton);
    expect(await screen.findAllByText("Delete")).toHaveLength(2);

    await user.hover(acceptButton);
    expect(await screen.findAllByText("Accept")).toHaveLength(2);

    await user.hover(denyButton);
    expect(await screen.findAllByText("Deny")).toHaveLength(2);
  });

  it("should call the correct functions when the buttons are clicked", async () => {
    render(
      <MockAuthProvider {...mockAuthContextWithAdmin}>
        <LeaveRequestActions {...props} />
      </MockAuthProvider>
    );

    const editButton = screen.getByLabelText("Edit Leave Request");
    const deleteButton = screen.getByLabelText("Delete Leave Request");
    const acceptButton = screen.getByLabelText("Accept Leave Request");
    const denyButton = screen.getByLabelText("Deny Leave Request");

    await user.click(editButton);
    expect(mockNavigate).toHaveBeenCalledWith(`edit-leave-request/${props.id}`);

    await user.click(deleteButton);
    expect(mockDeleteLeaveRequest).toHaveBeenCalledWith(props.id);

    await user.click(acceptButton);
    expect(mockUpdateStatus).toHaveBeenCalledWith({
      status: "Accepted",
      id: props.id,
    });

    await user.click(denyButton);
    expect(mockUpdateStatus).toHaveBeenCalledWith({
      status: "Denied",
      id: props.id,
    });
  });

  it("should render the correct toast message when updating the status and refetch leave requests", async () => {
    mockIsUpdateStatusSuccess = true;

    render(
      <MockAuthProvider {...mockAuthContextWithAdmin}>
        <LeaveRequestActions {...props} />
      </MockAuthProvider>
    );

    expect(
      await screen.findByText(`Leave Request id:${props.id} status updated`)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "The leave request status has been successfully updated"
      )
    ).toBeInTheDocument();

    expect(mockRefetchLeaveRequests).toHaveBeenCalled();
  });

  it("should render the correct toast message when deleting the leave request and refetch leave requests", async () => {
    mockIsDeleteLeaveRequestSuccess = true;

    render(
      <MockAuthProvider {...mockAuthContextWithAdmin}>
        <LeaveRequestActions {...props} />
      </MockAuthProvider>
    );

    expect(
      await screen.findByText("Leave Request Deleted")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("The leave request has been successfully deleted")
    ).toBeInTheDocument();

    expect(mockRefetchLeaveRequests).toHaveBeenCalled();
  });
});
