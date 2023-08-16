import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Container, Typography } from "@mui/material";
import TitleHeader from "../Layout/TitleHeader";
import { Link } from "react-router-dom";
import axios from "axios";
interface ResponseType {
  data: {
    sources?: any[];
  };
}

export type SourceData = {
  authorEmail?: string;
  authorName: string;
  authorityCountry: string;
  capAlertFeed: string;
  capAlertFeedStatus?: string;
  sourceId: number;
  sourceIsOfficial: boolean;
  byLanguage: { code: string; logo: string; name: StringConstructor }[];
};

const GetAllSources = () => {
  const [data, setData] = React.useState<SourceData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await axios.get(
          "https://cap-aggregator.azurewebsites.net/feeds/"
        );

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error("Data is empty or invalid.");
        }

        setData(response.data.sources as any);
        console.log("Alerts: ", response.data.sources);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const rows: any = [
  {
    sourceId: "af-andma-en",
    name: "Afghanistan: National Disaster Management Authority",
    language: "English",
    picUrl: "https://alert-hub.s3.amazonaws.com/images/af-andma-en.png",
    capAlertFeed: "https://cap-sources.s3.amazonaws.com/af-andma-en/rss.xml",
  },
  {
    sourceId: "al-igewe-en",
    name: "Albania: Institute of GeoSciences, Energy, Water and Environment",
    language: "English",
    picUrl: "https://alert-hub.s3.amazonaws.com/images/al-igewe-en.png",
    capAlertFeed: "https://cap-sources.s3.amazonaws.com/al-igewe-en/rss.xml",
  },
  {
    sourceId: "dz-meteo-en",
    name: "Algeria: National Meteorological Office",
    language: "English",
    picUrl: "https://alert-hub.s3.amazonaws.com/images/dz-meteo-en.png",
    capAlertFeed: "https://ametvigilance.meteo.dz/rss/rss_meteo_dz.xml",
  },
];
export const SourceFeeds = () => {
  const { data, loading, error } = GetAllSources();

  React.useEffect(() => {
    if (!loading || !error) {
      console.log(data);
    }
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "20px" }}>
      <TitleHeader title={`Source Feeds`} />
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                }}
                align="center"
              >
                Logo
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                }}
                align="center"
              >
                Source Name
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                }}
                align="center"
              >
                Language
              </TableCell>

              <TableCell
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                }}
                align="center"
              >
                CAP Alert Feed
              </TableCell>
            </TableRow>
            {rows.length === 0 ? (
              <TableRow sx={{ textAlign: "center" }}>
                <TableCell colSpan={6}>
                  <Typography
                    variant="h6"
                    textAlign={"center"}
                    padding={"10px"}
                  >
                    {" "}
                    🔍 No Sources are available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rows
                ).map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <img
                        src={row.picUrl}
                        alt="Source"
                        style={{ width: "200px", height: "auto" }}
                      />
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.language}</TableCell>
                    <TableCell align="center">
                      <Link
                        to={row.capAlertFeed}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.capAlertFeed}
                      </Link>{" "}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};
