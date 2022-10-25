import { Box, Button, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useAddProfessor, useForm } from "../../hooks";
import { postUser } from "../../utils";
import { CheckboxCont, PageHeader, SelectOptions, SnackBarComponent } from "../components";
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

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Profesor ha sido creado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const AddAdminPage = () => {
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const { addAdmin } = useContext(DataContext);
     const { formState, onInputChange, onResetForm } = useForm(initialForm);
     const { genre, handleGenre, country, handleCountry, blocked, handleCheck, resetUse } =
          useAddProfessor();

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (
               formState.nombre === "" ||
               formState.email === "" ||
               formState.telefono === "" ||
               formState.password === ""
          ) {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          const userToSend = {
               ...formState,
               sexo: genre,
               pais: "",
               bloqueado: blocked,
               rol: "Administrador",
               paisId: country,
               id: 0,
               imagen: "",
               ocupacion: "",
               fechaCreacion: new Date().toISOString(),
          };
          const res = await postUser(JSON.stringify(userToSend));
          if (res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return;
          }
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          onResetForm();
          resetUse();
          addAdmin(res.data);
     };
     return (
          <>
               <PageHeader title={"Gestión de Administradores"} />
               <Grid container>
                    <Box component={"form"} onSubmit={handleSubmit} sx={{ width: "100%" }}>
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
                                        <SelectOptions
                                             label={"País"}
                                             options={countriesRatio}
                                             handleSelect={handleCountry}
                                             value={country}
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
                         <Button type="submit" variant="outlined" sx={{ ml: 1 }}>
                              Guardar
                         </Button>
                    </Box>
               </Grid>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
