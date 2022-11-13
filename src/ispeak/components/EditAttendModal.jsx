import { Box, Button, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm, useParsedData } from "../../hooks";
import { getAttendanceById } from "../../utils";
import { DataContext } from "../context";
import { ModalEditLayout } from "../layout/ModalEditLayout";
import { initialClassOption } from "../utils";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialForm = {
     observaciones: "",
     date: "",
};

const initialSelected = {
     profesorSelected: "",
     moduloSelected: "",
     studentSelected: "",
     courseSelected: "",
     classSelected: "",
};

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El material de estudio ha sido editado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const EditAttendModal = ({ id, closeModal, isModalOpen }) => {
     const { courses, students, professors, getAttends } = useContext(DataContext);
     const { coursesParsed, studentsParsed, professorsParsed } = useParsedData({
          courses,
          students,
          professors,
     });
     const { observaciones, date, onInputChange, onResetForm } = useForm(initialForm);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [valueSelected, setValueSelected] = useState(initialSelected);
     const [isLoading, setIsLoading] = useState(false);
     const [selectsData, setSelectsData] = useState({ moduleList: [] });
     const [rawAttend, setRawAttend] = useState({});

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const onValueSelected = (e, selector) => {
          setValueSelected({
               ...valueSelected,
               [selector]: e.target.value,
          });
     };

     const getRawAttend = async () => {
          const res = await getAttendanceById(id);
          console.log(res);
     };

     const getLists = async () => {
          const res = await getModulesByCourse(valueSelected.courseSelected);
          setSelectsData({
               moduleList: res.map((mod) => ({ label: mod.nombre, value: mod.id })),
          });
     };

     useEffect(() => {
          if (id === "") return;
          getRawAttend()
     }, [id]);

     useEffect(() => {
          if (valueSelected.courseSelected === "") return;
          getLists();
     }, [valueSelected.courseSelected]);

     const onSubmit = async (e) => {
          e.preventDefault();
          if (
               valueSelected.classSelected === "" ||
               valueSelected.courseSelected === "" ||
               valueSelected.moduloSelected === "" ||
               valueSelected.profesorSelected === "" ||
               valueSelected.studentSelected === "" ||
               observaciones === "" ||
               date === ""
          ) {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          setIsLoading(true);
          const res = await postAttendance(
               processAttendance({ ...valueSelected, observaciones, date })
          );
          if (!res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               setIsLoading(false);
               return;
          }
          setIsLoading(false);
          setSnackBarInfo({
               ...initialSnackBar,
               isSnackBarOpen: true,
               message: "Asistencia creada exitosamente!!!",
          });
          onResetForm();
          setValueSelected(initialSelected);
          getAttends();
     };
     return (
          <>
               <ModalEditLayout isModalOpen={isModalOpen} handleModal={closeModal}>
                    <Box
                         component={"form"}
                         width={"100%"}
                         maxWidth={500}
                         sx={{ p: 5 }}
                         onSubmit={onSubmit}
                    >
                         <Grid container>
                              <Grid item xs={12} sx={{ m: 1 }}>
                                   <SelectOptions
                                        options={studentsParsed}
                                        value={valueSelected.studentSelected}
                                        label={"Alumno"}
                                        handleSelect={(e) => onValueSelected(e, "studentSelected")}
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ m: 1 }}>
                                   <SelectOptions
                                        options={coursesParsed}
                                        value={valueSelected.courseSelected}
                                        handleSelect={(e) => onValueSelected(e, "courseSelected")}
                                        label={"Curso"}
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ m: 1 }}>
                                   <SelectOptions
                                        options={professorsParsed}
                                        label={"Profesor"}
                                        value={valueSelected.profesorSelected}
                                        handleSelect={(e) => onValueSelected(e, "profesorSelected")}
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ m: 1 }}>
                                   <SelectOptions
                                        options={selectsData.moduleList}
                                        label={"Modulo"}
                                        value={valueSelected.moduloSelected}
                                        handleSelect={(e) => onValueSelected(e, "moduloSelected")}
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ m: 1 }}>
                                   <TextField
                                        type={"date"}
                                        name="date"
                                        value={date}
                                        onChange={onInputChange}
                                        fullWidth
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ m: 1 }}>
                                   <TextField
                                        fullWidth
                                        variant="outlined"
                                        label={"Observaciones"}
                                        name="observaciones"
                                        value={observaciones}
                                        onChange={onInputChange}
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ m: 1 }}>
                                   <SelectOptions
                                        options={initialClassOption}
                                        label={"Clase"}
                                        value={valueSelected.classSelected}
                                        handleSelect={(e) => onValueSelected(e, "classSelected")}
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ m: 1 }}>
                                   <Button variant="outlined" type="submit" sx={{ mr: 2 }}>
                                        Guardar
                                   </Button>
                                   <Button
                                        variant="contained"
                                        onClick={closeModal}
                                        color="error"
                                        disabled={isLoading}
                                   >
                                        Cancelar
                                   </Button>
                              </Grid>
                         </Grid>
                    </Box>
               </ModalEditLayout>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
