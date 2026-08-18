import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const storedSession = localStorage.getItem("learnstack_user");
  let session = null;

  // Safely check if the data exists AND isn't the literal string "undefined"
  if (storedSession && storedSession !== "undefined") {
    try {
      session = JSON.parse(storedSession);
    } catch (error) {
      console.error("Failed to parse session data. Clearing corrupted data.", error);
      localStorage.removeItem("learnstack_user"); // Clean up the bad data
    }
  }

  // If there is no valid session, or it's missing an email, kick them to auth
  if (!session || !session.email) {
    return <Navigate to="/auth" replace />;
  }

  // Otherwise, allow them to view the protected page
  return children;
}

export default ProtectedRoute;