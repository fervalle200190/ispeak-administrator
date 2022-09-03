import { Button, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useAddStudents, useForm } from "../../hooks";
import { postUser } from "../../utils";
import {
     CheckboxCont,
     PageHeader,
     SelectOptions,
     SnackBarComponent,
} from "../components";
import { DataContext } from "../context";
import { genreRatio, countriesRatio } from "../utils";

const initialForm = {
     nombre: "",
     email: "",
     telefono: "",
     password: "",
     ciudad: "",
     ocupacion: "",
     direccionCompleta: "",
};

export const AddStudentPage = () => {
     const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
     const { addStudent } = useContext(DataContext);
     const { formState, onInputChange, onResetForm } = useForm(initialForm);
     const {
          genre,
          handleGenre,
          country,
          handleCountry,
          blocked,
          handleCheck,
          resetUse,
     } = useAddStudents();

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
               formState.ocupacion === "" ||
               formState.direccionCompleta === ""
          ) {
               return;
          }
          const userToSend = {
               ...formState,
               sexo: genre,
               pais: "",
               bloqueado: blocked,
               rol: "Alumno",
               paisId: country,
               id: 0,
               imagen: "",
               fechaCreacion: new Date().toISOString(),
          };
          const res = await postUser(JSON.stringify(userToSend));
          if (res.activo) {
               handleSnackbar();
               onResetForm();
               resetUse();
               addStudent(res);
          }
     };
     return (
          <>
               <PageHeader title={"Alta de Alumnos"} />
               <form onSubmit={handleSubmit} autoComplete="off">
                    <Grid
                         container
                         justifyContent={"center"}
                         alignItems="flex-start"
                    >
                         <Grid item xs={12} sm={6}>
                              <Grid item xs={12} sx={{ m: 1 }}>
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
                              <Grid item xs={12} sx={{ m: 1 }}>
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
                              <Grid item xs={12} sx={{ m: 1 }}>
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
                              <Grid item xs={12} sx={{ m: 1 }}>
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
                              <Grid item xs={12} sx={{ m: 1 }}>
                                   <TextField
                                        type={"text"}
                                        label="Ciudad"
                                        fullWidth
                                        variant="outlined"
                                        name="ciudad"
                                        value={formState.ciudad}
                                        onChange={onInputChange}
                                        placeholder="Ciudad"
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                         </Grid>
                         <Grid item xs={12} sm={6}>
                              <Grid item xs={12} sx={{ m: 1 }}>
                                   <SelectOptions
                                        options={genreRatio}
                                        label={"Sexo"}
                                        value={genre}
                                        handleSelect={handleGenre}
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ m: 1 }}>
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
                              <Grid item xs={12} sx={{ m: 1 }}>
                                   <TextField
                                        type={"text"}
                                        fullWidth
                                        label={"Dirección"}
                                        placeholder="Dirección"
                                        variant="outlined"
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
                                        options={countriesRatio}
                                        label={"País"}
                                        value={country}
                                        handleSelect={handleCountry}
                                   />
                              </Grid>
                              <Grid item xs={12} sx={{ m: 1 }}>
                                   <CheckboxCont
                                        label={"Bloqueado"}
                                        handleCheck={handleCheck}
                                        value={blocked}
                                   />
                              </Grid>
                         </Grid>
                    </Grid>
                    <Button
                         size="large"
                         variant="outlined"
                         type="submit"
                         sx={{ m: 1 }}
                    >
                         Enviar
                    </Button>
               </form>
               <SnackBarComponent
                    handleSnackbar={handleSnackbar}
                    isSnackBarOpen={isSnackBarOpen}
                    message='El alumno ha sido creado exitosamente!!'
               />
          </>
     );
};
