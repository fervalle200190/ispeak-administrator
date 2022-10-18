import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useCoursesByBusinessList, useForm } from "../../hooks";
import { postRoom } from "../../utils";
import { ModalLayout } from "../layout/modalLayout";
import { SelectOptions } from "./SelectOptions";

const initialForm = {
     nombre: "",
     url: "",
     password: "",
};

export const AddRoomModal = ({
     handleModal,
     handleSnackbar,
     roomsChangers,
}) => {
     const { formState, onInputChange, onResetForm } = useForm(initialForm);
     const { courses, courseSelected, handleCourse, resetCourseSelected } =
          useCoursesByBusinessList(2);

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (
               formState.nombre === "" ||
               formState.url === "" ||
               courseSelected === ""
          ) {
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
          if (res.id !== 0) {
               roomsChangers.addData({
                    ...res,
                    curso: courses.filter(
                         (course) => course.value === res.cursoId
                    )[0].label,
               });
               handleSnackbar();
               onResetForm()
               resetCourseSelected()
               handleModal();
          }
     };
     return (
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
                              <Button
                                   type="submit"
                                   variant="outlined"
                                   size="large"
                              >
                                   Guardar
                              </Button>
                         </Grid>
                    </Grid>
               </Box>
          </ModalLayout>
     );
};
