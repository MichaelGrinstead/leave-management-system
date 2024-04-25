import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useGetUser } from "../hooks/useGetUser";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { userId, isAdmin } = useContext(AuthContext);
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
      <Shield className="text-midBlue" size={20} />
    </div>
  ) : (
    <h3 className="text-white">Hello, {userData.name}</h3>
  );

  const handleLogout = () => {
    console.log("logging out");
    logoutUser();
  };

  useEffect(() => {
    if (isLogoutUserSuccess) {
      navigate("/login");
    }
  }, [isLogoutUserSuccess]);
  return (
    <nav className="sticky top-0 z-60 bg-darkBlueGrey transition-colors duration-500 ease-in-out">
      <div className="relative  flex  items-center justify-between px-4 py-4 h-12">
        <h3 className="text-white text-2xl">Leave Management System</h3>
        {userData.name !== "" && (
          <div className="flex flex-row items-center justify-center gap-4">
            {name}
            <button className="text-white" onClick={() => handleLogout()}>
              log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
