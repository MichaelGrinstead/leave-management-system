import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useGetUser } from "../hooks/useGetUser";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { clx } from "../utils/clx";

export default function Navbar() {
  const navigate = useNavigate();
  const { userId, isAdmin, isLoggedIn } = useContext(AuthContext);
  const { userData } = useGetUser(userId);

  const {
    logoutUser,
    isLogoutUserPending,
    isLogoutUserSuccess,
    errorLoggingOutUser,
  } = useLogout();

  const name = isAdmin ? (
    <div className="flex flex-row items-center justify-center gap-1">
      <h3 className="text-white">Hello, {userData.name}</h3>
      <Shield className="text-white" size={20} />
    </div>
  ) : (
    <h3 className="text-white">Hello, {userData.name}</h3>
  );

  const handleLogout = () => {
    console.log("logging out");
    logoutUser();
  };

  const headerPlacement = isLoggedIn ? "justify-between" : "justify-center";

  useEffect(() => {
    if (isLogoutUserSuccess) {
      navigate("/login");
    }
  }, [isLogoutUserSuccess]);
  return (
    <nav className="sticky top-0 z-60 bg-darkBlue transition-colors duration-500 ease-in-out">
      <div
        className={clx(
          "relative  flex  items-center px-4 py-4 h-12",
          headerPlacement
        )}
      >
        <h3 className="text-white text-2xl">Leave Management System</h3>
        {userData.name !== "" && (
          <div className="flex flex-row items-center justify-center gap-6">
            {name}
            <button className="text-white" onClick={() => handleLogout()}>
              logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
