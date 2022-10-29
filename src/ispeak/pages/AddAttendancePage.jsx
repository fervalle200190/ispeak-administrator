import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "../../hooks";
import { PageHeader, SelectOptions } from "../components";

const initialForm = {
     observaciones: "",
};

export const AddAttendancePage = () => {
     const { observaciones, onInputChange } = useForm(initialForm);
     return (
          <>
               <PageHeader title="Gestión de Asistencias" />
               <Box component={"form"} width={"100%"} maxWidth={500}>
                    <Grid container>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions options={[]} label={"Alumno"} />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions options={[]} label={"Curso"} />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions options={[]} label={"Profesor"} />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions options={[]} label={"Modulo"} />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <TextField type={"date"} fullWidth />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <TextField
                                   fullWidth
                                   variant="outlined"
                                   label={"Observaciones"}
                                   name="observaciones"
                                   value={observaciones}
                                   onChange={onInputChange}
                                   InputLabelProps={{
                                        className: "textfield-label",
                                   }}
                              />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <SelectOptions options={[]} label={"Clase"} />
                         </Grid>
                         <Grid item xs={12} sx={{ m: 1 }}>
                              <Button variant='outlined'>
                                   Guardar
                              </Button>
                         </Grid>
                    </Grid>
               </Box>
          </>
     );
};
