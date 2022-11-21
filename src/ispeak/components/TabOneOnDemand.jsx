import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks";
import { postCourse } from "../../utils";
import { DataContext } from "../context";
import { initialCategory } from "../utils";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialForm = {
     nombre: "",
};

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Curso ha sido creado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const TabOneOnDemand = () => {
     const [professorsList, setProfessorsList] = useState([]);
     const { formState, onInputChange, onResetForm } = useForm(initialForm);
     const [professorSelected, setProfessorSelected] = useState("");
     const [categorySelected, setCategorySelected] = useState("");
     const { professors, coursesChangers } = useContext(DataContext);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const handleProfessor = (e) => {
          setProfessorSelected(e.target.value);
     };

     const handleCategory = (e) => {
          setCategorySelected(e.target.value);
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (formState.nombre === "" || categorySelected === "") {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          const dataToSend = {
               id: 0,
               nombre: formState.nombre,
               duracion: 0,
               fechaCreacion: new Date().toISOString(),
               activo: "true",
               planEstudio: categorySelected,
               unidadNegocioId: 4,
          };
          const res = await postCourse(JSON.stringify(dataToSend));
          if (!res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return;
          }
          onResetForm();
          setProfessorSelected("");
          setCategorySelected("");
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          coursesChangers.addData(res.data);
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
               <Typography variant="h6">
                    Crear curso
               </Typography>
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
                    {/* <Grid item xs={12} sm={7} sx={{ m: 1 }}>
                         <SelectOptions
                              value={professorSelected}
                              handleSelect={handleProfessor}
                              options={professorsList}
                              label="Profesor"
                         />
                    </Grid> */}
                    <Grid item xs={12} sm={7} sx={{ m: 1 }}>
                         <SelectOptions
                              value={categorySelected}
                              handleSelect={handleCategory}
                              options={initialCategory}
                              label="Categoria"
                         />
                    </Grid>
                    <Grid item xs={12} sm={7} sx={{ m: 1 }}>
                         <Button variant="outlined" type="submit" size="large">
                              Agregar
                         </Button>
                    </Grid>
               </Grid>

               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </Box>
     );
};
