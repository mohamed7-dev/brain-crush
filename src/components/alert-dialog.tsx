"use client";
import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type AlertDialogProps = {
  headerTitle?: string;
  message?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  TriggerButton: React.ReactNode;
};

export function AlertDialog({
  headerTitle,
  message,
  onConfirm,
  onClose,
  onCancel,
  TriggerButton,
}: AlertDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  const handleCancel = () => {
    onCancel?.();
    handleClose();
  };
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };
  return (
    <React.Fragment>
      {React.isValidElement(TriggerButton)
        ? // @ts-expect-error
          React.cloneElement(TriggerButton, { onClick: handleClickOpen })
        : TriggerButton}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"lg"}
      >
        <DialogTitle id="alert-dialog-title">
          {headerTitle ? headerTitle : "Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ minWidth: "20rem" }}
            id="alert-dialog-description"
          >
            {message ? message : "This action cannot be undone."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleConfirm}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
