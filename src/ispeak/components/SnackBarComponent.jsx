import { Alert, Snackbar } from "@mui/material";

export const SnackBarComponent = ({isSnackBarOpen, handleSnackbar, message = ''}) => {
     return (
          <Snackbar
               open={isSnackBarOpen}
               anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
               autoHideDuration={6000}
               onClose={handleSnackbar}
          >
               <Alert
                    onClose={handleSnackbar}
                    severity="success"
                    sx={{ width: "100%" }}
               >
                    {message}
               </Alert>
          </Snackbar>
     );
};
