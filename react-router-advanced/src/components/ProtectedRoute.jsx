import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ isAuthed }) {
  const location = useLocation();
  // If logged in, let you in; if not, send you to login and remember where you were going
  return isAuthed ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
