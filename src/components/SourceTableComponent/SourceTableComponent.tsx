import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { SourceFeed } from "../MapComponent/MapComponent";
// const sources = [
//   {
//     sourceId: "af-andma-en",
//     name: "Afghanistan: National Disaster Management Authority",
//     language: "English",
//     url: "https://alert-hub.s3.amazonaws.com/images/af-andma-en.png",
//   },
//   {
//     sourceId: "al-igewe-en",
//     name: "Albania: Institute of GeoSciences, Energy, Water and Environment",
//     language: "English",
//     url: "https://alert-hub.s3.amazonaws.com/images/al-igewe-en.png",
//   },
//   {
//     sourceId: "dz-meteo-en",
//     name: "Algeria: National Meteorological Office",
//     language: "English",
//     url: "https://alert-hub.s3.amazonaws.com/images/dz-meteo-en.png",
//   },
//   {
//     sourceId: "ai-dma-en",
//     name: "Anguilla: Disaster Management Anguilla",
//     language: "English",
//     url: "https://alert-hub.s3.amazonaws.com/images/ai-dma-en.png",
//   },
//   {
//     sourceId: "ag-ms-en",
//     name: "Antigua and Barbuda: Meteorological Services",
//     language: "English",
//     url: "https://alert-hub.s3.amazonaws.com/images/ag-ms-en.png",
//   },
//   {
//     sourceId: "ar-smn-es",
//     name: "Argentina: Servicio Meteorologico Nacional",
//     language: "Spanish",
//     url: "https://alert-hub.s3.amazonaws.com/images/ar-smn-es.png",
//   },
//   {
//     sourceId: "aw-dma-nl",
//     name: "Aruba: Meteorologische Dienst Aruba",
//     language: "Dutch",
//     url: "https://alert-hub.s3.amazonaws.com/images/aw-dma-nl.png",
//   },
// ];
const columns = [
  { field: "name", headerName: "Source Name", width: 400 },
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
    </Box>
  );
};

export default SourcesTableComponent;
