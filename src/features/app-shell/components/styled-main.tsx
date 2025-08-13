import { Box, BoxProps } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const Main = styled(Box)<BoxProps>(({ theme }) =>
  theme.unstable_sx({
    flexGrow: 1,
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
      : alpha(theme.palette.background.default, 1),
    overflow: "auto",
    width: "100%",
  })
);
