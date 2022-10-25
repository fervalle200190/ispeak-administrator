import { Box, Button, Grid, TextField } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "../../hooks";
import { postCourse } from "../../utils";
import { DataContext } from "../context";
import { SnackBarComponent } from "./SnackBarComponent";

const initialForm = {
     nombre: "",
     duracion: "",
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

export const TabOne = ({ businessUnit }) => {
     const { formState, onInputChange, onResetForm } = useForm(initialForm);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const { coursesChangers } = useContext(DataContext);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };
     const handleSubmit = async (e) => {
          e.preventDefault();
          if (formState.nombre === "" || formState.duracion === "") {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          const dataToSend = {
               id: 0,
               nombre: formState.nombre,
               duracion: formState.duracion,
               fechaCreacion: new Date().toISOString(),
               activo: "true",
               planEstudio: "",
               unidadNegocioId: businessUnit,
               profesorId: "",
               // profesorId: professorSelected,
          };
          const res = await postCourse(JSON.stringify(dataToSend));
          if (!res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return;
          }
          onResetForm();
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          coursesChangers.addData(res);
     };
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
                         <TextField
                              fullWidth
                              label="Duracion(meses)"
                              name="duracion"
                              value={formState.duracion}
                              onChange={onInputChange}
                              InputLabelProps={{
                                   className: "textfield-label",
                              }}
                         />
                    </Grid>
                    <Grid item xs={12} sm={7} sx={{ m: 1, mt: 3 }}>
                         <Button type="submit" variant="outlined" size="large">
                              Guardar
                         </Button>
                    </Grid>
               </Grid>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </Box>
     );
};
