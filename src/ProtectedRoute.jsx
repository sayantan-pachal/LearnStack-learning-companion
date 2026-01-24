import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const session = JSON.parse(localStorage.getItem("learnstack_user"));

  if (!session?.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;