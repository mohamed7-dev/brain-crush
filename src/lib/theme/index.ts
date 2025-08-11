"use client";

import { createTheme } from "@mui/material";
import { colorSchemes, typography, shadows, shape } from "./primitives";
import {
  customButtonComponents,
  customInputComponents,
} from "./custom-input-components";
import { customSurfaceComponents } from "./custom-surface-components";
import { customNavigationComponents } from "./custom-navigation-components";
import { customFeedbackComponents } from "./custom-feedback-components";
import { customDataDisplayComponents } from "./custom-data-display-components";

export const theme = createTheme({
  cssVariables: {
    cssVarPrefix: "template",
    colorSchemeSelector: "class",
  },
  colorSchemes,
  typography,
  shadows,
  shape,
  components: {
    ...customInputComponents,
    ...customButtonComponents,
    ...customSurfaceComponents,
    ...customNavigationComponents,
    ...customFeedbackComponents,
    ...customDataDisplayComponents,
  },
});
