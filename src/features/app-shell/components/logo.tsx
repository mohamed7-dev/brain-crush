import Box from "@mui/material/Box";
import Image from "next/image";
import LogoImage from "@/public/logo.svg";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { routes } from "@/lib/routes";
import Link from "@mui/material/Link";

export function Logo() {
  return (
    <Link
      href={routes.home}
      sx={{ textDecoration: "none", "&::before": { width: "0%" } }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "center", mr: "auto" }}
      >
        <Box
          sx={{
            borderRadius: "999px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Image
            src={LogoImage}
            alt="logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </Box>
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: "text.primary", textDecoration: "none" }}
        >
          BrainCrush
        </Typography>
      </Stack>
    </Link>
  );
}
