import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";

const BreadcrumbsComponent = () => {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
  }

  const breadcrumbs = [
    <Link
      underline="none"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
      sx={{ color: "rgb(27, 27, 27)" }}
    >
      MUI
    </Link>,
    <Link
      underline="none"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
      sx={{ color: "rgb(27, 27, 27)" }}
    >
      Core
    </Link>,
    <Typography
      key="3"
      color="text.primary"
      sx={{ fontWeight: "bolder", color: "rgb(27, 27, 27)" }}
    >
      Breadcrumb
    </Typography>,
  ];
  return (
    <Stack spacing={2}>
      <Breadcrumbs separator=">" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};
export default BreadcrumbsComponent;
