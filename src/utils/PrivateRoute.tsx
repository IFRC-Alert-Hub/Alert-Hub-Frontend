// import { Outlet, Navigate } from "react-router-dom";
// // import { useMutation } from "@apollo/client";
// // import { auth_system } from "../API/API_Links";
// // import { VERIFY_TOKEN } from "../API/mutations/verifyToken";
// import { useContext } from "react";
// import { UserContext } from "../context/UserContext";

// const PrivateRoutes = () => {
//   const userContext = useContext(UserContext);

//   return userContext.user ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default PrivateRoutes;

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
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoutes;
