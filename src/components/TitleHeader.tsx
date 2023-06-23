import { Typography, Box } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";

interface TitleHeaderProps {
  title: string;
  rightTitle?: any;
  rightLinkURL?: any;
  selectedFilter?: string;
  filterKey?: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({
  title,
  rightTitle,
  rightLinkURL,
  selectedFilter,
  filterKey,
}) => {
  return (
    <Box
      minHeight={"40px"}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Align items on the left and right
        borderBottom: "1px solid #c9c3c1",
      }}
      marginBottom={"10px"}
    >
      <Typography
        fontSize={"16px"}
        variant="h3"
        fontWeight="600"
        sx={{ m: "0 0 5px 0" }}
        textAlign={"left"}
        textTransform={"uppercase"}
        letterSpacing={"1.6px"}
      >
        {title}
      </Typography>
      {rightTitle ? (
        <Link
          to={{
            pathname: rightLinkURL,
          }}
          state={{ selectedFilter: selectedFilter, filterKey: filterKey }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {" "}
          <Typography
            sx={{
              textDecoration: "underline",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                color: "#F5333F",
                cursor: "pointer",
              },
            }}
          >
            {rightTitle}
            <ArrowRightIcon />
          </Typography>
        </Link>
      ) : (
        ""
      )}
    </Box>
  );
};

export default TitleHeader;
