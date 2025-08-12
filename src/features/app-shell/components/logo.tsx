import Box from "@mui/material/Box";
import Image from "next/image";
import LogoImage from "@/public/logo.svg";
import Typography from "@mui/material/Typography";
import { routes } from "@/lib/routes";
import { Button } from "@mui/material";

export function Logo() {
  return (
    <Button
      href={routes.home}
      sx={{ alignItems: "center", gap: 1, px: 2, py: 4 }}
    >
      <Box
        sx={{
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
    </Button>
  );
}
