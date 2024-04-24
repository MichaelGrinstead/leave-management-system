import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}
