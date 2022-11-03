import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useCoursesByBusinessList, useForm } from "../../hooks";
import { postRoom } from "../../utils";
import { ModalLayout } from "../layout/ModalLayout";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialForm = {
     nombre: "",
     url: "",
     password: "",
};

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "La sala ha sido creada exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const AddRoomModal = ({ handleModal, roomsChangers }) => {
     const { formState, onInputChange, onResetForm } = useForm(initialForm);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const { courses, courseSelected, handleCourse, resetCourseSelected } =
          useCoursesByBusinessList(2);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (formState.nombre === "" || formState.url === "" || courseSelected === "") {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          const dataToSend = {
               id: 0,
               cursoId: courseSelected,
               nombre: formState.nombre,
               url: formState.url,
               activa: "true",
               password: formState.password,
          };
          const res = await postRoom(dataToSend);
          if (!res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return;
          }
          roomsChangers.addData({
               ...res.data,
               curso: courses.filter((course) => course.value === res.data.cursoId)[0].label,
          });
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          onResetForm();
          resetCourseSelected();
          handleModal();
     };
     return (
          <>
               <ModalLayout width={"50%"}>
                    <Box component="form" sx={{ p: 4 }} onSubmit={handleSubmit}>
                         <Typography variant="h6" sx={{ mb: 2 }}>
                              Agregar una sala
                         </Typography>
                         <Grid container spacing={1}>
                              <Grid item xs={12}>
                                   <TextField
                                        fullWidth
                                        label="Nombre"
                                        name="nombre"
                                        value={formState.nombre}
                                        onChange={onInputChange}
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <TextField
                                        fullWidth
                                        label="Url"
                                        name="url"
                                        value={formState.url}
                                        onChange={onInputChange}
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        value={formState.password}
                                        onChange={onInputChange}
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <SelectOptions
                                        options={courses}
                                        handleSelect={handleCourse}
                                        value={courseSelected}
                                        label="Curso"
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <Button type="submit" variant="outlined" size="large">
                                        Guardar
                                   </Button>
                              </Grid>
                         </Grid>
                    </Box>
               </ModalLayout>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
