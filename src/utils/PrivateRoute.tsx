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
import { VERIFY_TOKEN } from "../API/mutations/authMutations";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Progress from "../components/Progress";

const PrivateRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [verify] = useMutation(VERIFY_TOKEN, {
    client: auth_system,
  });

  const userContext = useContext(UserContext);

  useEffect(() => {
    verify()
      .then((verifyData) => {
        console.log(verifyData.data.verifyToken);
        if (verifyData.data.verifyToken) {
          setIsAuthenticated(true);
          setIsLoading(false);
        } else {
          setIsAuthenticated(false);
          setIsLoading(false);
          userContext.setUser(null);
          console.error("Token verification failed:");
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
        setIsLoading(false);
        userContext.setUser(null);

        console.error("Token verification failed:", error);
      });
  }, [verify, userContext]);

  if (isLoading) {
    return <></>;
  }

  return isAuthenticated && !isLoading ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoutes;
