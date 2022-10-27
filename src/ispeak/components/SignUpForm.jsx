import { Box, Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useCourseSelect, useForm, useSignUpForm } from "../../hooks";
import { postSignUp } from "../../utils";
import { getSignUpToSendDate } from "../helper";
import { signUpType } from "../utils";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Estudiante ha sido inscrito exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const SignUpForm = () => {
     const { coursesList, courseSelected, handleCourse, resetCourse } = useCourseSelect();
     const { observaciones, onInputChange, startDate, endDate, onResetForm } = useForm({
          observaciones: "",
          startDate: "",
          endDate: "",
     });
     const [isLoading, setIsLoading] = useState(false)
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const {
          roomList,
          studentsParsed,
          professorsParsed,
          tipoClaseSelected,
          studentSelected,
          professorSelected,
          roomSelected,
          onValueSelected,
          onResetAllSelects,
          getSignUps
     } = useSignUpForm(courseSelected, {
          studentSelected: "",
          tipoClaseSelected: "",
          professorSelected: "",
          roomSelected: "",
     });

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const onSubmit = async (e) => {
          e.preventDefault();
          if (
               observaciones === "" ||
               startDate === "" ||
               endDate === "" ||
               studentSelected === "" ||
               professorSelected === "" ||
               roomSelected === ""
          ) {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          setIsLoading(true)
          const res = await postSignUp(
               getSignUpToSendDate({
                    studentSelected,
                    courseSelected,
                    professorSelected,
                    tipoClaseSelected,
                    roomSelected,
                    observaciones,
                    startDate,
                    endDate,
               })
          );
          setIsLoading(false)
          if (!res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return;
          }
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          onResetAllSelects();
          onResetForm();
          getSignUps()
          resetCourse()
     };

     return (
          <Box component="form" sx={{ pb: 5 }} onSubmit={onSubmit}>
               <Grid container spacing={1}>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions
                              options={studentsParsed}
                              handleSelect={(e) => onValueSelected(e, "studentSelected")}
                              label="Alumno"
                              value={studentSelected}
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions
                              options={professorsParsed}
                              handleSelect={(e) => onValueSelected(e, "professorSelected")}
                              label="Profesor"
                              value={professorSelected}
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions
                              options={coursesList}
                              value={courseSelected}
                              handleSelect={handleCourse}
                              label="Curso"
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <Typography variant="h6">Horarios</Typography>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions
                              options={roomList}
                              label="Sala"
                              handleSelect={(e) => onValueSelected(e, "roomSelected")}
                              value={roomSelected}
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions
                              options={signUpType}
                              value={tipoClaseSelected}
                              handleSelect={(e) => onValueSelected(e, "tipoClaseSelected")}
                              label="Tipo de clase"
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <Typography>Fecha de inicio</Typography>
                         <TextField
                              type="date"
                              name="startDate"
                              value={startDate}
                              onChange={onInputChange}
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <Typography>Fecha de finalización</Typography>
                         <TextField
                              type="date"
                              name="endDate"
                              value={endDate}
                              onChange={onInputChange}
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <TextField
                              type="text"
                              fullWidth
                              multiline
                              label="Observaciones"
                              name="observaciones"
                              value={observaciones}
                              onChange={onInputChange}
                              InputLabelProps={{
                                   className: "textfield-label",
                              }}
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <Button variant="outlined" size="large" type="submit" disabled={isLoading}>
                              Guardar
                         </Button>
                    </Grid>
               </Grid>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </Box>
     );
};
