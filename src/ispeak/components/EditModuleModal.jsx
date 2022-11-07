import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCourseSelect, useForm } from "../../hooks";
import { getModuleById, updateModule } from "../../utils";
import { processModule } from "../helper";
import { ModalEditLayout } from "../layout/ModalEditLayout";
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
     message: "El material de estudio ha sido editado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const EditModuleModal = ({ isModalOpen, id, closeModal }) => {
     const { nombre, duracion, contenido, objetivos, onInputChange, formState, setFormState } =
          useForm(initialForm);
     const { coursesList, courseSelected, handleCourse } = useCourseSelect();
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [moduleRaw, setModuleRaw] = useState({});

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const onSubmit = async (e) => {
          e.preventDefault();
          if (
               nombre === moduleRaw.nombre &&
               duracion === moduleRaw.duracion &&
               contenido === moduleRaw.contenido &&
               objetivos === moduleRaw.objetivos &&
               courseSelected === moduleRaw.cursoId
          ) {
               setSnackBarInfo({ ...errorSnackbar, message: 'Por favor realiza algun cambio' });
               return;
          }
          const res = await updateModule({ ...moduleRaw, ...formState, cursoId: courseSelected });
          if (!res.ok) {
               return setSnackBarInfo({ ...errorSnackbar, message: errorMessage });
          }
          setSnackBarInfo({ ...initialSnackBar, message: res.data, isSnackBarOpen: true });
     };

     const getData = async () => {
          const { ok, data, errorMessage } = await getModuleById(id);
          if (!ok) {
               return setSnackBarInfo({ ...errorSnackbar, message: errorMessage });
          }
          setModuleRaw(data);
          const { nombre, duracion, cursoId, contenido, objetivos } = data;
          setFormState({ nombre, duracion, contenido, objetivos });
          handleCourse({ target: { value: cursoId } });
     };
     useEffect(() => {
          if (id === "") return;
          getData();
     }, [id]);

     return (
          <>
               <ModalEditLayout width={`50%`} isModalOpen={isModalOpen} handleModal={closeModal}>
                    <Box component={"form"} onSubmit={onSubmit}>
                         <Grid container sx={{ p: 4 }} spacing={2}>
                              <Grid item xs={12}>
                                   <Typography variant="h5">Editar Modulo</Typography>
                              </Grid>
                              <Grid item xs={12}>
                                   <TextField
                                        fullWidth
                                        label="Nombre"
                                        name="nombre"
                                        onChange={onInputChange}
                                        value={nombre}
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
                                        value={duracion}
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <SelectOptions
                                        options={coursesList}
                                        label="Curso"
                                        value={courseSelected}
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
                                        value={contenido}
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
                                        value={objetivos}
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
                                        Guardar
                                   </Button>
                                   <Button variant="contained" color="error" onClick={closeModal}>
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
