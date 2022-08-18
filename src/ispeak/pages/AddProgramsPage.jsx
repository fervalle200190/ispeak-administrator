import { Box, FormControl, Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "../../hooks";
import { CheckboxCont, CoursesList, PageHeader } from "../components";

const initialForm = {
     nombre: "",
     descripcion: "",
     active: false,
};

export const AddProgramsPage = () => {
     const { formState, onInputChange } = useForm(initialForm);
     const [checked, setChecked] = useState([]);

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

     return (
          <>
               <PageHeader title="Agregar Programa" />
               <Box component={"form"} sx={{pb: 8}}>
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
                                        value={formState.active}
                                        handleCheck={onInputChange}
                                        name="active"
                                        label='Activo'
                                   />
                              </Grid>
                         </Grid>
                    </FormControl>
                    <Grid container>
                         <CoursesList
                              handleCheck={handleCheck}
                              checked={checked}
                         />
                    </Grid>
                    <Button variant='outlined' size="large" type="submit" >
                        Guardar
                    </Button>
               </Box>
          </>
     );
};
