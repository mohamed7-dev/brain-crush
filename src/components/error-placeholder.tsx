import { ErrorOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type ErrorPlaceholderProps = {
  error: Error;
  actionButtonLabel?: string;
  actionButtonPath?: string;
  children?: React.ReactNode;
};
export function ErrorPlaceholder({
  error,
  actionButtonLabel,
  actionButtonPath,
  children,
}: ErrorPlaceholderProps) {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
        gap: 2,
      }}
    >
      <ErrorOutlined color="error" fontSize={"large"} />
      <Typography component={"h1"} variant="h2">
        {error.name}
      </Typography>
      <Typography component={"p"} variant="h4">
        {error.message}
      </Typography>
      <Stack direction={"row"} sx={{ alignItems: "center", gap: 1 }}>
        {children ? (
          children
        ) : (
          <Button href={actionButtonPath} variant="outlined">
            {actionButtonLabel}
          </Button>
        )}
        <Button variant="contained" onClick={() => window.location.reload()}>
          Reload
        </Button>
      </Stack>
    </Stack>
  );
}
