import {
     Alert,
     Box,
     Button,
     Checkbox,
     FormControlLabel,
     FormGroup,
     Grid,
     Snackbar,
     TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { useAddProfessor, useForm } from "../../hooks";
import { postUser } from "../../utils";
import { CheckboxCont, PageHeader, SelectOptions } from "../components";
import { DataContext } from "../context";
import { countriesRatio, genreRatio } from "../utils";

const initialForm = {
     nombre: "",
     email: "",
     telefono: "",
     password: "",
     ciudad: "",
     direccionCompleta: "",
};

export const AddProfessorPage = () => {
     const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
     const { addProfessor } = useContext(DataContext);
     const { formState, onInputChange, onResetForm } = useForm(initialForm);
     const {
          genre,
          handleGenre,
          country,
          handleCountry,
          blocked,
          handleCheck,
          resetUse,
     } = useAddProfessor();

     const handleSnackbar = () => {
          setIsSnackBarOpen(!isSnackBarOpen);
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (
               formState.nombre === "" ||
               formState.email === "" ||
               formState.telefono === "" ||
               formState.password === "" ||
               formState.ciudad === "" ||
               formState.direccionCompleta === ""
          ) {
               return;
          }
          const userToSend = {
               ...formState,
               sexo: genre,
               pais: "",
               bloqueado: blocked,
               rol: "Profesor",
               paisId: country,
               id: 0,
               imagen: "",
               ocupacion: "",
               fechaCreacion: new Date().toISOString(),
          };
          const res = await postUser(JSON.stringify(userToSend));
          if (res.activo) {
               handleSnackbar();
               onResetForm();
               resetUse();
               addProfessor(res);
          }
          console.log(res);
     };
     return (
          <>
               <PageHeader title={"Gestión de Profesores"} />
               <Grid container>
                    <Box
                         component={"form"}
                         onSubmit={handleSubmit}
                         sx={{ width: "100%" }}
                    >
                         <Grid container>
                              <Grid item xs={12} sm={6}>
                                   <Grid item xs={12} sx={{ m: 1 }}>
                                        <TextField
                                             fullWidth
                                             variant="outlined"
                                             label={"Nombre Completo"}
                                             name="nombre"
                                             value={formState.nombre}
                                             onChange={onInputChange}
                                             InputLabelProps={{
                                                  className: "textfield-label",
                                             }}
                                        />
                                   </Grid>
                                   <Grid item xs={12} sx={{ m: 1 }}>
                                        <TextField
                                             fullWidth
                                             variant="outlined"
                                             label={"Email"}
                                             name="email"
                                             value={formState.email}
                                             onChange={onInputChange}
                                             InputLabelProps={{
                                                  className: "textfield-label",
                                             }}
                                        />
                                   </Grid>
                                   <Grid item xs={12} sx={{ m: 1 }}>
                                        <TextField
                                             fullWidth
                                             variant="outlined"
                                             label={"Contraseña"}
                                             name="password"
                                             value={formState.password}
                                             onChange={onInputChange}
                                             InputLabelProps={{
                                                  className: "textfield-label",
                                             }}
                                        />
                                   </Grid>
                                   <Grid item xs={12} sx={{ m: 1 }}>
                                        <TextField
                                             fullWidth
                                             variant="outlined"
                                             label={"Nro. Teléfono"}
                                             name="telefono"
                                             value={formState.telefono}
                                             onChange={onInputChange}
                                             InputLabelProps={{
                                                  className: "textfield-label",
                                             }}
                                        />
                                   </Grid>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                   <Grid item xs={12} sx={{ m: 1 }}>
                                        <TextField
                                             fullWidth
                                             variant="outlined"
                                             label={"Dirección"}
                                             name="direccionCompleta"
                                             value={formState.direccionCompleta}
                                             onChange={onInputChange}
                                             InputLabelProps={{
                                                  className: "textfield-label",
                                             }}
                                        />
                                   </Grid>
                                   <Grid item xs={12} sx={{ m: 1 }}>
                                        <SelectOptions
                                             label={"País"}
                                             options={countriesRatio}
                                             handleSelect={handleCountry}
                                             value={country}
                                        />
                                   </Grid>
                                   <Grid item xs={12} sx={{ m: 1 }}>
                                        <TextField
                                             fullWidth
                                             variant="outlined"
                                             label={"Ciudad"}
                                             name="ciudad"
                                             value={formState.ciudad}
                                             onChange={onInputChange}
                                             InputLabelProps={{
                                                  className: "textfield-label",
                                             }}
                                        />
                                   </Grid>
                                   <Grid item xs={12} sx={{ m: 1 }}>
                                        <SelectOptions
                                             label={"Sexo"}
                                             options={genreRatio}
                                             handleSelect={handleGenre}
                                             value={genre}
                                        />
                                   </Grid>
                              </Grid>
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <CheckboxCont
                                   handleCheck={handleCheck}
                                   value={blocked}
                                   label={"Bloqueado"}
                              />
                         </Grid>
                         <Button
                              type="submit"
                              variant="outlined"
                              sx={{ ml: 1 }}
                         >
                              Guardar
                         </Button>
                    </Box>
               </Grid>
               <Snackbar
                    open={isSnackBarOpen}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    autoHideDuration={6000}
                    onClose={handleSnackbar}
               >
                    <Alert
                         onClose={handleSnackbar}
                         severity="success"
                         sx={{ width: "100%" }}
                    >
                         El profesor ha sido creado exitosamente!!
                    </Alert>
               </Snackbar>
          </>
     );
};
