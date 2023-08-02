import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { SourceFeed } from "../MapComponent/MapComponent";

const columns = [
  { field: "id", headerName: "Source Name", width: 400 },
  { field: "url", headerName: "URL", width: 500 },
];

interface SourcesTableProps {
  sources: SourceFeed[];
}

const SourcesTableComponent: React.FC<SourcesTableProps> = ({ sources }) => {
  const rows = sources.map((source, index) => ({
    id: index + 1,
    ...source,
  }));

  return (
    <Box height={600} width={"100%"}>
      {sources.length === 0 ? (
        <Typography variant="body1" align="center" mt={4}>
          No sources are available.
        </Typography>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={150}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          slots={{ toolbar: GridToolbar }}
          sx={{
            "& .MuiDataGrid-toolbarContainer": {
              backgroundColor: "black",
            },
            "& .MuiCheckbox-root.Mui-checked": {
              color: "black",
            },
          }}
        />
      )}
    </Box>
  );
};

export default SourcesTableComponent;
