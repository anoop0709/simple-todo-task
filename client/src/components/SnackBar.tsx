import { Snackbar, Alert } from "@mui/material";

type Props = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
};

export default function AppSnackbar({
  open,
  message,
  severity,
  onClose,
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}