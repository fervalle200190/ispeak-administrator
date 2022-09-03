import { Box, FormControl, Grid, TextField, Button } from "@mui/material";
import { useContext, useState } from "react";
import { useForm, useGetAllCoursesCombo } from "../../hooks";
import {
     CheckboxCont,
     CoursesList,
     PageHeader,
     SnackBarComponent,
} from "../components";
import { DataContext } from "../context";
import { processPrograms } from "../helper";

const initialForm = {
     nombre: "",
     descripcion: "",
     activo: false,
};

export const AddProgramsPage = () => {
     const { formState, onInputChange, onResetForm } = useForm(initialForm);
     const { addPrograms } = useContext(DataContext);
     const [checked, setChecked] = useState([]);
     const { coursesCombo } = useGetAllCoursesCombo();
     const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
     const [active, setActive] = useState(false);

     const handleSnackbar = () => {
          setIsSnackBarOpen(!isSnackBarOpen);
     };

     const handleActive = () => {
          setActive(!active);
     };

     const handleCheck = (value) => {
          const currentIndex = checked.indexOf(value);
          const newChecked = [...checked];

          if (currentIndex === -1) {
               newChecked.push(value);
          } else {
               newChecked.splice(currentIndex, 1);
          }

          setChecked(newChecked);
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (formState.nombre === "" || formState.descripcion === "") {
               return;
          }
          const dataToSend = {
               ...formState,
               activo: active,
               id: 0,
          };
          const res = await processPrograms(dataToSend, checked, coursesCombo);
          if (res.id) {
               onResetForm();
               setChecked([]);
               handleSnackbar();
               addPrograms(res);
               setActive(false)
          }
     };

     return (
          <>
               <PageHeader title="Agregar Programa" />
               <Box component={"form"} sx={{ pb: 8 }} onSubmit={handleSubmit}>
                    <FormControl
                         sx={{ width: "100%" }}
                         onChange={onInputChange}
                    >
                         <Grid container>
                              <Grid item xs={12} sm={7} sx={{ m: 1 }}>
                                   <TextField
                                        name="nombre"
                                        value={formState.nombre}
                                        label={"Nombre"}
                                        fullWidth
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12} sm={7} sx={{ m: 1 }}>
                                   <TextField
                                        name="descripcion"
                                        value={formState.descripcion}
                                        label={"Descripcion"}
                                        multiline
                                        fullWidth
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12} sm={7} sx={{ m: 1 }}>
                                   <CheckboxCont
                                        value={active}
                                        handleCheck={handleActive}
                                        name="activo"
                                        label="Activo"
                                   />
                              </Grid>
                         </Grid>
                    </FormControl>
                    <Grid container>
                         <CoursesList 
                              handleCheck={handleCheck}
                              checked={checked}
                              coursesCombo={coursesCombo}
                         />
                    </Grid>
                    <Button variant="outlined" size="large" type="submit">
                         Guardar
                    </Button>
               </Box>
               <SnackBarComponent
                    isSnackBarOpen={isSnackBarOpen}
                    handleSnackbar={handleSnackbar}
                    message="El programa ha sido creado exitosamente!!"
               />
          </>
     );
};
