import { screen } from "@testing-library/react";
import render from "../../utils/renderWithProviders";
import userEvent from "@testing-library/user-event";
import Login from "../../../components/Auth/Login";

const mockLoginUser = vi.fn();
const mockNavigate = vi.fn();

let mockIsLoginUserPending = false;
let mockIsLoginUserSuccess = false;

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

describe("Login", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    mockIsLoginUserPending = false;
    mockIsLoginUserSuccess = false;
  });

  it("should render the Login component with form and header", () => {
    render(<Login />);
    const heading = screen.getByRole("heading", { name: "Login" });
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const createButton = screen.getByRole("button", { name: "Login" });

    expect(heading).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(createButton).toBeInTheDocument();
  });

  it("should render the LoadingSpinner when the hook states are pending", () => {
    mockIsLoginUserPending = true;

    render(<Login />);

    const loadingSpinner = screen.getByLabelText("loading-spinner");

    expect(loadingSpinner).toBeInTheDocument();
  });

  it("should call the handleCreateAccount function when the form is submitted and navigate to the home page", async () => {
    const user = userEvent.setup();
    mockIsLoginUserSuccess = true;
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const createButton = screen.getByRole("button", { name: "Login" });

    await user.type(emailInput, "john@gmail.com");
    await user.type(passwordInput, "password");
    await user.click(createButton);

    await vi.waitFor(() => {
      expect(mockLoginUser).toHaveBeenCalledWith({
        email: "john@gmail.com",
        password: "password",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
