"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

type SnackbarMessage = {
  message: string;
  severity?: AlertColor;
  duration?: number;
  action?: React.ReactNode;
};

type SnackbarContextType = {
  showSnackbar: (msg: SnackbarMessage) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within GlobalSnackbarProvider");
  }
  return context;
};

type SnackbarProviderProps = {
  children: React.ReactNode;
};
export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const queueRef = useRef<SnackbarMessage[]>([]);
  const [current, setCurrent] = useState<SnackbarMessage | null>(null);
  const [open, setOpen] = useState(false);

  const showSnackbar = useCallback(
    (msg: SnackbarMessage) => {
      queueRef.current.push(msg);
      if (!current && !open) {
        processQueue();
      }
    },
    [current, open]
  );

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      const next = queueRef.current.shift()!;
      setCurrent(next);
      setOpen(true);
    }
  };

  const handleExited = () => {
    setCurrent(null);
    processQueue();
  };

  const handleClose = (_event?: unknown, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
    handleExited();
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        key={current ? current.message : undefined}
        open={open}
        autoHideDuration={current?.duration ?? 3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={current?.action}
      >
        {current ? (
          <Alert
            onClose={handleClose}
            severity={current.severity ?? "info"}
            sx={{ width: "100%" }}
          >
            {current.message}
          </Alert>
        ) : (
          <></>
        )}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
