import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useContext, useMemo } from "react";
import { useCourseSelect, useForm, useSignUpForm } from "../../hooks";
import { postSignUpsOnDemand } from "../../utils";
import { DataContext } from "../context";
import { getSignUpToSend } from "../helper";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Alumno ha sido inscrito exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

const initialForm = { observaciones: "" };

export const SignUpFormOnDemand = () => {
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const {
          studentSelected,
          programSelected,
          studentsParsed,
          programsParsed,
          onStudentSelectedChange,
          onProgramSelectedChange,
          resetSelects
     } = useSignUpForm("");
     const { observaciones, onInputChange, onResetForm } = useForm(initialForm);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const onSubmit = async (e) => {
          e.preventDefault();
          if (studentSelected === "" || programSelected === "" || observaciones === "") {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          const res = await postSignUpsOnDemand(
               getSignUpToSend({ programSelected, studentSelected, observaciones })
          );
          if (!res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return;
          }
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          onResetForm();
          resetSelects()
     };
     return (
          <Box component="form" onSubmit={onSubmit}>
               <Grid container spacing={1}>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions
                              options={studentsParsed}
                              label="Alumno"
                              handleSelect={onStudentSelectedChange}
                              value={studentSelected}
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions
                              options={programsParsed}
                              value={programSelected}
                              handleSelect={onProgramSelectedChange}
                              label="Programa"
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <TextField
                              type="text"
                              fullWidth
                              multiline
                              name="observaciones"
                              value={observaciones}
                              onChange={onInputChange}
                              label="Observaciones"
                              InputLabelProps={{
                                   className: "textfield-label",
                              }}
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <Button variant="outlined" size="large" type="submit">
                              Guardar
                         </Button>
                    </Grid>
               </Grid>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </Box>
     );
};
