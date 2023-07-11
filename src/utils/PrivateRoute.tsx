import { Outlet, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { auth_system } from "../API/API_Links";
import { VERIFY_TOKEN } from "../API/mutations/verifyToken";
import { useEffect, useState } from "react";

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [verify] = useMutation(VERIFY_TOKEN, {
    client: auth_system,
  });

  useEffect(() => {
    // Perform the token verification when the component mounts
    verify()
      .then(() => {
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsAuthenticated(false);
        setIsLoading(false);
        console.error("Token verification failed:", error);
      });
  }, [verify]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated && !isLoading ? (
    <Outlet /> // Render the child routes here
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoutes;
