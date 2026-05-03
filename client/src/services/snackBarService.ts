type SnackbarFn = (message: string, type?: "success" | "error") => void;

let snackbarHandler: SnackbarFn | null = null;

export const setSnackbarHandler = (fn: SnackbarFn) => {
    snackbarHandler = fn;
};

export const showGlobalSnackbar = (
    message: string,
    type: "success" | "error" = "error"
) => {
    if (snackbarHandler) {
        snackbarHandler(message, type);
    } else {
        console.warn("Snackbar handler not set");
    }
};