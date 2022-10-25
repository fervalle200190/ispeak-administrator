import { Button, Grid, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { SnackBarComponent } from "../../ispeak/components";
import { postLogin } from "../../utils";
import { AuthContext } from "../context";

export const LoginPage = () => {
     const { formState, onInputChange } = useForm({ email: "", password: "" });
     const { handleLogin } = useContext(AuthContext);
     const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
     const handleSnackbar = () => {
          setIsSnackbarOpen(!isSnackbarOpen);
     };
     const call = async (e) => {
          e.preventDefault();
          const res = await postLogin({
               email: formState.email,
               password: formState.password,
          });
          if (!res.ok) {
               return alert(res.error);
          }
          if (res.data.rol !== "Administrador") {
               handleSnackbar();
               return;
          }
          if (res.status === 200) {
               localStorage.setItem("LoggedUser", JSON.stringify(res.data));
               window.location.reload();
          }
     };
     return (
          <Grid container justifyContent={"center"} alignItems="center" minHeight={"100vh"}>
               <Grid
                    item
                    xs={10}
                    md={6}
                    sx={{
                         backgroundColor: "#efefef",
                         padding: { xs: 2, sm: 5, md: 10 },
                         borderRadius: 1,
                    }}
               >
                    <form onSubmit={call}>
                         <Grid container direction={"column"} spacing={3}>
                              <Grid item>
                                   <TextField
                                        type={"text"}
                                        label="Correo Electrónico"
                                        placeholder="Correo Electrónico"
                                        name="email"
                                        value={formState.email}
                                        onChange={onInputChange}
                                        variant="filled"
                                        fullWidth
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item>
                                   <TextField
                                        type={"password"}
                                        label="Contraseña"
                                        placeholder="contraseña"
                                        name={"password"}
                                        value={formState.password}
                                        onChange={onInputChange}
                                        variant="filled"
                                        fullWidth
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                         </Grid>
                         <Button
                              variant="contained"
                              type="submit"
                              sx={{ background: "primary.dark", mt: 1 }}
                         >
                              Ingresar
                         </Button>
                    </form>
               </Grid>
               <SnackBarComponent
                    isSnackBarOpen={isSnackbarOpen}
                    handleSnackbar={handleSnackbar}
                    message="no tienes los permisos necesarios para acceder"
                    severity="error"
               />
          </Grid>
     );
};
