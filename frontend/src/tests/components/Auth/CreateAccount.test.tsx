import { screen } from "@testing-library/react";
import CreateAccount from "../../../components/Auth/CreateAccount";
import render from "../../utils/renderWithProviders";
import userEvent from "@testing-library/user-event";

const mockAddNewUser = vi.fn();
const mockLoginUser = vi.fn();
const mockNavigate = vi.fn();

let mockIsAddNewUserPending = false;
let mockIsAddNewUserSuccess = false;
let mockIsLoginUserPending = false;
let mockIsLoginUserSuccess = false;

vi.mock("../../../hooks/useAddNewUser", () => ({
  useAddNewUser: () => ({
    addNewUser: mockAddNewUser,
    isAddNewUserPending: mockIsAddNewUserPending,
    isAddNewUserSuccess: mockIsAddNewUserSuccess,
    errorAddingNewUser: null,
  }),
}));
vi.mock("../../../hooks/useLogin", () => ({
  useLogin: () => ({
    loginUser: mockLoginUser,
    isLoginUserPending: mockIsLoginUserPending,
    isLoginUserSuccess: mockIsLoginUserSuccess,
    errorLoggingIn: null,
  }),
}));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("CreateAccount", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    mockIsAddNewUserPending = false;
    mockIsAddNewUserSuccess = false;
    mockIsLoginUserPending = false;
    mockIsLoginUserSuccess = false;
  });

  it("should render the CreateAccount component with form and header", () => {
    render(<CreateAccount />);
    const heading = screen.getByRole("heading", { name: "Create Account" });
    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const createButton = screen.getByRole("button", { name: "Create" });

    expect(heading).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
  });

  it("should render the LoadingSpinner when the hook states are pending", () => {
    mockIsAddNewUserPending = true;
    mockIsLoginUserPending = true;

    render(<CreateAccount />);

    console.log(mockIsLoginUserPending, mockIsAddNewUserPending);

    const loadingSpinner = screen.getByLabelText("loading-spinner");

    expect(loadingSpinner).toBeInTheDocument();
    console.log("test two", mockAddNewUser, mockLoginUser);
  });

  it("should call the handleCreateAccount function when the form is submitted and navigate to the home page", async () => {
    const user = userEvent.setup();
    mockIsAddNewUserSuccess = true;
    mockIsLoginUserSuccess = true;
    render(<CreateAccount />);

    const nameInput = screen.getByPlaceholderText("Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const createButton = screen.getByRole("button", { name: "Create" });

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@gmail.com");
    await user.type(passwordInput, "password");
    await user.click(createButton);

    await vi.waitFor(() => {
      expect(mockAddNewUser).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@gmail.com",
        password: "password",
      });

      expect(mockLoginUser).toHaveBeenCalledWith({
        email: "john@gmail.com",
        password: "password",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/");
      console.log("test three", mockAddNewUser, mockLoginUser);
    });
  });
});
