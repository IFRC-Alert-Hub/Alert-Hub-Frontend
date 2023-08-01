// import { Container } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import * as React from "react";
// import axios from "axios";

// const AlertInfo = () => {
//   const { id } = useParams();
//   const [alertData, setAlertData] = React.useState(null);
//   const [isLoading, setIsLoading] = React.useState(true);
//   const navigate = useNavigate();

//   const fetchAlertData = async () => {
//     try {
//       const response = await axios.get(
//         `https://alert-manager.azurewebsites.net/alert/get/${id}`
//       );
//       if (response.status === 200) {
//         const data = response.data;
//         console.log(data);
//         setAlertData(data);
//       } else {
//         redirectTo404();
//       }
//     } catch (error) {
//       redirectTo404();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const redirectTo404 = () => {
//     navigate("/404");
//   };

//   React.useEffect(() => {
//     fetchAlertData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   if (isLoading) {
//     return <p>Loading...</p>;
//   } else if (alertData) {
//     return (
//       <Container maxWidth="lg">
//         <h1>Alert Info</h1>
//       </Container>
//     );
//   } else {
//     return <p>Error: Unable to fetch alert data.</p>;
//   }
// };

// export default AlertInfo;

import { Container, Typography } from "@mui/material";
import React from "react";

const AlertInfo = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: "10px" }}>
      <Typography
        variant={"h1"}
        fontWeight={"bolder"}
        sx={{ textAlign: "center" }}
      >
        Alert ID
      </Typography>
    </Container>
  );
};

export default AlertInfo;
