import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useGetUser } from "../hooks/useGetUser";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const { userData } = useGetUser(userId);
  console.log(userId);
  console.log(userData);

  const {
    logoutUser,
    isLogoutUserPending,
    isLogoutUserSuccess,
    errorLoggingOutUser,
  } = useLogout();

  console.log({
    isLogoutUserPending,
    isLogoutUserSuccess,
    errorLoggingOutUser,
  });

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
            <h3 className="text-white">Hello, {userData?.name}</h3>
            <button className="text-white" onClick={() => handleLogout()}>
              log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
