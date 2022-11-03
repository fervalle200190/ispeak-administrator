import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "../../hooks";
import { postModules } from "../../utils";
import { CourseContext } from "../context";
import { ModalLayout } from "../layout/ModalLayout";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialForm = {
     nombre: "",
     duracion: "",
     contenido: "",
     objetivos: "",
};

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Modulo ha sido creado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const AddModuleModal = ({ courses, handleModal }) => {
     const { formState, onInputChange, onResetForm } = useForm(initialForm);
     const [courseModule, setCourseModule] = useState("");
     const { addModule } = useContext(CourseContext);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const handleCourse = (e) => {
          setCourseModule(e.target.value);
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (
               formState.nombre === "" ||
               formState.duracion === "" ||
               formState.contenido === "" ||
               formState.objetivos === "" ||
               courseModule === ""
          ) {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }

          const moduleToSend = {
               ...formState,
               cursoId: courseModule,
          };
          const module = await postModules(moduleToSend);
          if (!module.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return;
          }
          addModule(module.data);
          onResetForm();
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          setCourseModule("");
     };
     return (
          <>
               <ModalLayout width={"50%"}>
                    <Box component={"form"} onSubmit={handleSubmit}>
                         <Grid container sx={{ p: 4 }} spacing={2}>
                              <Grid item xs={12}>
                                   <Typography variant="h5">Nuevo Modulo</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                   <TextField
                                        fullWidth
                                        label="Nombre"
                                        name="nombre"
                                        onChange={onInputChange}
                                        value={formState.nombre}
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <TextField
                                        fullWidth
                                        label="Duración(horas)"
                                        name="duracion"
                                        onChange={onInputChange}
                                        value={formState.duracion}
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <SelectOptions
                                        options={courses}
                                        label="Curso"
                                        value={courseModule}
                                        handleSelect={handleCourse}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <TextField
                                        fullWidth
                                        multiline
                                        label="Contenido"
                                        name="contenido"
                                        onChange={onInputChange}
                                        value={formState.contenido}
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <TextField
                                        fullWidth
                                        multiline
                                        label="Objetivos a cumplir"
                                        name="objetivos"
                                        onChange={onInputChange}
                                        value={formState.objetivos}
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              {/* <Grid item xs={12}>
                    <CheckboxCont label="Activo" />
                    </Grid> */}
                              <Grid item>
                                   <Button variant="outlined" type="submit" sx={{ mr: 2 }}>
                                        Agregar
                                   </Button>
                                   <Button variant="contained" color="error" onClick={handleModal}>
                                        Cancelar
                                   </Button>
                              </Grid>
                         </Grid>
                    </Box>
               </ModalLayout>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
