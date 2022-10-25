import { Alert, Snackbar } from "@mui/material";

export const SnackBarComponent = ({isSnackBarOpen, handleSnackbar, message = '', severity = 'success'}) => {
     return (
          <Snackbar
               open={isSnackBarOpen}
               anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
               autoHideDuration={3000}
               onClose={handleSnackbar}
          >
               <Alert
                    onClose={handleSnackbar}
                    severity={severity}
                    sx={{ width: "100%" }}
               >
                    {message}
               </Alert>
          </Snackbar>
     );
};
