import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Grab the session data we saved during Login/Signup
  const session = JSON.parse(localStorage.getItem("learnstack_user"));

  // If there is no session, or the session is missing an email, kick them to login
  if (!session || !session.email) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, allow them to view the protected page (like Dashboard)
  return children;
}

export default ProtectedRoute;