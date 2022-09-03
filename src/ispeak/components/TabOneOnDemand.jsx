import { Box, Button, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks";
import { postCourse } from "../../utils";
import { DataContext } from "../context";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialForm = {
     nombre: "",
};

export const TabOneOnDemand = () => {
     const [professorsList, setProfessorsList] = useState([]);
     const { formState, onInputChange, onResetForm } = useForm(initialForm);
     const [professorSelected, setProfessorSelected] = useState("");
     const { professors, coursesChangers } = useContext(DataContext);
     const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

     const handleSnackbar = () => {
          setIsSnackBarOpen(!isSnackBarOpen);
     };

     const handleProfessor = (e) => {
          setProfessorSelected(e.target.value);
     };

     const handleSubmit = async (e) => {
          e.preventDefault()
          if (formState.nombre === "") {
               return;
          }
          const dataToSend = {
               id: 0,
               nombre: formState.nombre,
               duracion: 0,
               fechaCreacion: new Date().toISOString(),
               activo: 'true',
               planEstudio: "",
               unidadNegocioId: "4",
               profesorId: "",
               // profesorId: professorSelected,
          };
          const res = await postCourse(JSON.stringify(dataToSend));
          if(res.nombre) {
               onResetForm()
               setProfessorSelected("")
               handleSnackbar()
               coursesChangers.addData(res)
          }
     };

     useEffect(() => {
          setProfessorsList(
               professors.rows.map((professor) => ({
                    value: professor.id,
                    label: professor.nameAndLastName,
               }))
          );
     }, [professors]);

     return (
          <Box component="form" sx={{ width: "100%" }} onSubmit={handleSubmit}>
               <Grid container>
                    <Grid item xs={12} sm={7} sx={{ m: 1 }}>
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
                    <Grid item xs={12} sm={7} sx={{ m: 1 }}>
                         <SelectOptions
                              value={professorSelected}
                              handleSelect={handleProfessor}
                              options={professorsList}
                              label="Profesor"
                         />
                    </Grid>
               </Grid>
               <Button
                    variant="outlined"
                    type="submit"
                    size="large"
                    sx={{ mt: 3 }}
               >
                    Agregar
               </Button>
               <SnackBarComponent
                    handleSnackbar={handleSnackbar}
                    isSnackBarOpen={isSnackBarOpen}
                    message="El curso ha sido creado exitosamente!!"
               />
          </Box>
     );
};
