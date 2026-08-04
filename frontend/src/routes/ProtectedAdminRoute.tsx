import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedAdminRoute({
  children,
}: Props) {

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const admin =
    localStorage.getItem("admin") ||
    sessionStorage.getItem("admin");

  if (!token || !admin) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return <>{children}</>;
}