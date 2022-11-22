import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAddStudents, useForm } from "../../hooks";
import { updateUser } from "../../utils";
import { DataContext } from "../context";
import { ModalEditLayout } from "../layout/ModalEditLayout";
import { countriesRatio, genreRatio } from "../utils";
import { CoursesListModal } from "./CoursesListModal";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialForm = {
     nombre: "",
     email: "",
     telefono: "",
     password: "",
     ciudad: "",
     ocupacion: "",
     direccionCompleta: "",
};

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El alumno ha sido actualizado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const EditStudentModal = ({ isModalOpen, closeModal, modalData }) => {
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const { getStudentsAndProfessors } = useContext(DataContext)
     const [isLoading, setIsLoading] = useState(false);
     const { formState, onInputChange, onResetForm, setFormState } = useForm(initialForm);
     const { genre, handleGenre, country, handleCountry, blocked, handleCheck, resetUse } =
          useAddStudents();

     useEffect(() => {
          if (!modalData.user) return;
          const { nombre, email, telefono, password, ciudad, ocupacion, sexo, paisId } =
               modalData.user;
          setFormState({ nombre, email, telefono, password, ciudad, ocupacion });
          handleGenre({ target: { value: sexo } });
          handleCountry({ target: { value: paisId } });
     }, [modalData]);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const onSubmit = async (e) => {
          e.preventDefault();
          const user = modalData.user;
          if (
               formState.nombre === user.nombre &&
               formState.email === user.email &&
               formState.telefono === user.telefono &&
               formState.password === user.password &&
               formState.ocupacion === user.ocupacion
          ) {
               setSnackBarInfo({
                    ...errorSnackbar,
                    message: "Por favor cambia alguno de los datos",
               });
               return;
          }
          setIsLoading(true)
          const res = await updateUser({ ...user, ...formState });
          setIsLoading(false)
          if (!res) {
               return setSnackBarInfo({ ...errorSnackbar, message: 'Ha ocurrido un error' });
          }
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true })
          getStudentsAndProfessors()
     };
     return (
          <>
               <ModalEditLayout isModalOpen={isModalOpen} handleModal={closeModal}>
                    {modalData.cursos && <CoursesListModal coursesList={modalData.cursos} />}
                    <Box component={"form"} p={5} onSubmit={onSubmit}>
                         <Typography variant="h5" mb={1}>
                              Editar alumno
                         </Typography>
                         <Grid container>
                              <Grid item xs={12} sx={{ my: 1 }}>
                                   <TextField
                                        type={"text"}
                                        label="Nombre"
                                        fullWidth
                                        variant="outlined"
                                        name="nombre"
                                        value={formState.nombre}
                                        onChange={onInputChange}
                                        placeholder="Nombre"
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ my: 1 }}>
                                   <TextField
                                        type={"email"}
                                        label="Correo Electrónico"
                                        fullWidth
                                        variant="outlined"
                                        name="email"
                                        value={formState.email}
                                        onChange={onInputChange}
                                        placeholder="Correo Electrónico"
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ my: 1 }}>
                                   <TextField
                                        type={"number"}
                                        fullWidth
                                        label="Teléfono"
                                        variant="outlined"
                                        name="telefono"
                                        value={formState.telefono}
                                        onChange={onInputChange}
                                        placeholder="Teléfono"
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ my: 1 }}>
                                   <TextField
                                        type={"password"}
                                        label="Contraseña"
                                        fullWidth
                                        variant="outlined"
                                        name="password"
                                        value={formState.password}
                                        onChange={onInputChange}
                                        placeholder="Contraseña"
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ my: 1 }}>
                                   <TextField
                                        type={"text"}
                                        label={"Ocupación"}
                                        fullWidth
                                        variant="outlined"
                                        name="ocupacion"
                                        value={formState.ocupacion}
                                        onChange={onInputChange}
                                        placeholder="Ocupación"
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12} mt={2}>
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
