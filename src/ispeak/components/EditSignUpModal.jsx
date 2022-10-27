import { Box, Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import { useEffect, useState } from "react";
import { useCourseSelect, useForm, useSignUpForm } from "../../hooks";
import { getSignUpById, postSignUp, updateSignUp } from "../../utils";
import { getSignUpToSendDate } from "../helper";
import { ModalEditLayout } from "../layout/ModalEditLayout";
import { signUpType } from "../utils";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Estudiante ha sido editado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const EditSignUpModal = ({ isModalOpen, handleModal, id }) => {
     const { coursesList, courseSelected, handleCourse, resetCourse } = useCourseSelect();
     const { observaciones, onInputChange, startDate, endDate, onResetForm, setFormState } =
          useForm({
               observaciones: "",
               startDate: "",
               endDate: "",
          });
     const [isLoading, setIsLoading] = useState(false);
     const [rawInfo, setRawInfo] = useState({})
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
          getSignUps,
          setValueSelected,
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

     const roomChosen = useMemo(
          () => !!roomList.find((room) => room.value === roomSelected),
          [roomList, roomSelected]
     );

     const getSignUp = async (signId) => {
          const res = await getSignUpById(signId);
          setFormState({
               observaciones: res.observaciones,
               startDate: res.fechaIncio.slice(0, -9),
               endDate: res.fechaFin.slice(0, -9),
          });
          setValueSelected({
               studentSelected: res.alumnoId,
               professorSelected: res.profesorId,
               tipoClaseSelected: res.tipoClase,
               roomSelected: res.salaId,
          });
          handleCourse({ target: { value: res.cursoId } });
          setRawInfo(res)
     };

     useEffect(() => {
          if (id === "") return;
          getSignUp(id);
     }, [id]);

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
          setIsLoading(true);
          const res = await updateSignUp(
               getSignUpToSendDate({
                    rawInfo,
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
          setIsLoading(false);
          if (!res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return;
          }
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          onResetAllSelects();
          onResetForm();
          getSignUps();
          resetCourse();
     };

     return (
          <>
               <ModalEditLayout isModalOpen={isModalOpen} handleModal={handleModal}>
                    <Box component="form" sx={{ p: 5 }} onSubmit={onSubmit}>
                         <Grid container spacing={1}>
                              <Grid item xs={12}>
                                   <SelectOptions
                                        options={studentsParsed}
                                        handleSelect={(e) => onValueSelected(e, "studentSelected")}
                                        label="Alumno"
                                        value={studentSelected}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <SelectOptions
                                        options={professorsParsed}
                                        handleSelect={(e) =>
                                             onValueSelected(e, "professorSelected")
                                        }
                                        label="Profesor"
                                        value={professorSelected}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <SelectOptions
                                        options={coursesList}
                                        value={courseSelected}
                                        handleSelect={handleCourse}
                                        label="Curso"
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <Typography variant="h6">Horarios</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                   <SelectOptions
                                        options={roomList}
                                        label="Sala"
                                        handleSelect={(e) => onValueSelected(e, "roomSelected")}
                                        value={roomChosen ? roomSelected : ""}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <SelectOptions
                                        options={signUpType}
                                        value={tipoClaseSelected}
                                        handleSelect={(e) =>
                                             onValueSelected(e, "tipoClaseSelected")
                                        }
                                        label="Tipo de clase"
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <Typography>Fecha de inicio</Typography>
                                   <TextField
                                        type="date"
                                        name="startDate"
                                        value={startDate}
                                        onChange={onInputChange}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <Typography>Fecha de finalización</Typography>
                                   <TextField
                                        type="date"
                                        name="endDate"
                                        value={endDate}
                                        onChange={onInputChange}
                                   />
                              </Grid>
                              <Grid item xs={12}>
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
                              <Grid item xs={12}>
                                   <Button
                                        variant="outlined"
                                        size="large"
                                        type="submit"
                                        disabled={isLoading}
                                   >
                                        Guardar
                                   </Button>
                              </Grid>
                         </Grid>
                    </Box>
               </ModalEditLayout>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
