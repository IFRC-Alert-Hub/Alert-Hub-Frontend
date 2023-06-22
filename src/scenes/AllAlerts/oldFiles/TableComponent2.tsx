// import React, { useState } from "react";
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   MenuItem,
//   Menu,
//   Button,
//   Box,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// interface Data {
//   id: number;
//   name: string;
//   age: number;
//   email: string;
//   [key: string]: string | number;
// }

// const initialData: Data[] = [
//   { id: 1, name: "John Doe", age: 41, email: "aohndoe@example.com" },
//   { id: 2, name: "Jane Smith", age: 32, email: "banesmith@example.com" },
//   { id: 3, name: "Bob Johnson", age: 41, email: "zobjohnson@example.com" },
//   { id: 4, name: "Bob Johnson", age: 41, email: "eobjohnson@example.com" },
//   { id: 5, name: "John Doe", age: 41, email: "fobjohnson@example.com" },
//   { id: 6, name: "John Doe", age: 22, email: "fobjohnson@example.com" },
// ];

// const FilterableTableComponent: React.FC = () => {
//   const [filters, setFilters] = useState<Record<string, string>>({});

//   const [ageSortOrder, setAgeSortOrder] = useState<"asc" | "desc" | "">("");
//   const [emailSortOrder, setEmailSortOrder] = useState<"asc" | "desc" | "">("");
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

//   const filteredData = initialData.filter((data) => {
//     for (const key in filters) {
//       const filterValue = filters[key].toLowerCase();
//       if (filterValue === "") continue; // Skip empty filters
//       if (data[key].toString().toLowerCase() !== filterValue) {
//         return false;
//       }
//     }
//     return true;
//   });
//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMenuItemClick = (value: string) => {
//     if (value === "All") {
//       setFilters((prevFilters) => ({ ...prevFilters, name: "" }));
//     } else {
//       setFilters((prevFilters) => ({ ...prevFilters, name: value }));
//     }
//     handleClose();
//   };
//   const sortedData = filteredData.sort((a, b) => {
//     if (ageSortOrder === "asc") {
//       return a.age - b.age;
//     } else if (ageSortOrder === "desc") {
//       return b.age - a.age;
//     } else if (emailSortOrder === "asc") {
//       return a.email.localeCompare(b.email);
//     } else if (emailSortOrder === "desc") {
//       return b.email.localeCompare(a.email);
//     }
//     return 0;
//   });

//   const handleSortClick = () => {
//     if (ageSortOrder === "") {
//       setAgeSortOrder("asc");
//       setEmailSortOrder(""); // Reset email sorting
//     } else if (ageSortOrder === "asc") {
//       setAgeSortOrder("desc");
//     } else {
//       setAgeSortOrder(""); // Reset to no sorting
//     }
//   };

//   const handleEmailSortClick = () => {
//     if (emailSortOrder === "") {
//       setEmailSortOrder("asc");
//       setAgeSortOrder(""); // Reset age sorting
//     } else if (emailSortOrder === "asc") {
//       setEmailSortOrder("desc");
//     } else {
//       setEmailSortOrder(""); // Reset to no sorting
//     }
//   };

//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>
//             <Button
//               id="demo-customized-button"
//               aria-controls={anchorEl ? "demo-customized-menu" : undefined}
//               aria-haspopup="true"
//               variant="contained"
//               disableElevation
//               disableRipple
//               onClick={handleClick}
//               endIcon={<KeyboardArrowDownIcon sx={{ color: "#f5333f" }} />}
//               sx={{
//                 padding: "0px",
//                 borderRadius: "0px",
//                 borderBottom: "1px solid transparent",
//                 "&:hover": { backgroundColor: "transparent !important" },
//                 "&:focus": { backgroundColor: "transparent !important" },
//                 backgroundColor: "transparent !important",
//                 textTransform: "capitalize",
//               }}
//             >
//               {filters["name"] || "Name"}
//             </Button>
//             <Menu
//               elevation={0}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               id="demo-customized-menu"
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               <MenuItem onClick={() => handleMenuItemClick("All")}>
//                 All Users
//               </MenuItem>
//               <MenuItem onClick={() => handleMenuItemClick("John Doe")}>
//                 John Doe
//               </MenuItem>
//               <MenuItem onClick={() => handleMenuItemClick("Jane Smith")}>
//                 Jane Smith
//               </MenuItem>
//               <MenuItem onClick={() => handleMenuItemClick("Bob Johnson")}>
//                 Bob Johnson
//               </MenuItem>
//             </Menu>
//           </TableCell>
//           <TableCell>
//             <Button
//               onClick={handleSortClick}
//               disableElevation
//               disableRipple
//               sx={{
//                 padding: "0px",
//                 margin: "0px",
//                 borderRadius: "0px",
//                 borderBottom: "1px solid transparent",
//                 "&:hover": { backgroundColor: "transparent !important" },
//                 "&:focus": { backgroundColor: "transparent !important" },
//                 backgroundColor: "transparent !important",
//                 textTransform: "capitalize",
//                 color:
//                   ageSortOrder === "asc" || ageSortOrder === "desc"
//                     ? "#f5333f"
//                     : "black",
//                 minWidth: "auto",
//               }}
//             >
//               Age
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <KeyboardArrowUpIcon
//                   fontSize="small"
//                   sx={{
//                     color: ageSortOrder === "asc" ? "#f5333f" : "black",
//                     fontSize: "0.5rem !important",
//                     width: "1.5em",
//                     height: "1.5em",
//                   }}
//                 />
//                 <KeyboardArrowDownIcon
//                   fontSize="small"
//                   sx={{
//                     color: ageSortOrder === "desc" ? "#f5333f" : "black",
//                     fontSize: "0.5rem !important",
//                     width: "1.5em",
//                     height: "1.5em",
//                   }}
//                 />
//               </Box>
//             </Button>
//           </TableCell>
//           <TableCell>
//             <Button
//               onClick={handleEmailSortClick}
//               disableElevation
//               disableRipple
//               sx={{
//                 padding: "0px",
//                 margin: "0px",
//                 borderRadius: "0px",
//                 borderBottom: "1px solid transparent",
//                 "&:hover": { backgroundColor: "transparent !important" },
//                 "&:focus": { backgroundColor: "transparent !important" },
//                 backgroundColor: "transparent !important",
//                 textTransform: "capitalize",
//                 color:
//                   emailSortOrder === "asc" || emailSortOrder === "desc"
//                     ? "#f5333f"
//                     : "black",
//                 minWidth: "auto",
//               }}
//             >
//               Email
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <KeyboardArrowUpIcon
//                   fontSize="small"
//                   sx={{
//                     color: emailSortOrder === "asc" ? "#f5333f" : "black",
//                     fontSize: "0.5rem !important",
//                     width: "1.5em",
//                     height: "1.5em",
//                   }}
//                 />
//                 <KeyboardArrowDownIcon
//                   fontSize="small"
//                   sx={{
//                     color: emailSortOrder === "desc" ? "#f5333f" : "black",
//                     fontSize: "0.5rem !important",
//                     width: "1.5em",
//                     height: "1.5em",
//                   }}
//                 />
//               </Box>
//             </Button>
//           </TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {sortedData.map((data) => (
//           <TableRow key={data.id}>
//             <TableCell>{data.name}</TableCell>

//             <TableCell>{data.age}</TableCell>
//             <TableCell>{data.email}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default FilterableTableComponent;
const FilterableTableComponent: React.FC = () => {
  return <h1>Old Component</h1>;
};

export default FilterableTableComponent;
