import { Box, Button, FormLabel, Grid, TextField, Typography } from "@mui/material";
import { useCoursesByBusinessList } from "../../hooks";
import { SelectOptions } from "./SelectOptions";

export const SignUpForm = () => { 
     const { courses, courseSelected, handleCourse } =
          useCoursesByBusinessList(2);
     return (
          <Box component="form" sx={{ pb: 5 }}>
               <Grid container spacing={1}>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions options={courses} label="Alumno" />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions options={courses} label="Profesor" />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions
                              options={courses}
                              value={courseSelected}
                              handleSelect={handleCourse}
                              label="Curso"
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <Typography variant="h6">Horarios</Typography>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions options={courses} label="Sala" />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions
                              options={courses}
                              label="Tipo de clase"
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <Typography>Fecha de inicio</Typography>
                         <TextField type="date" />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <Typography>Fecha de finalización</Typography>
                         <TextField type="date" />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <TextField
                              type="text"
                              fullWidth
                              multiline
                              label="Observaciones"
                              InputLabelProps={{
                                   className: "textfield-label",
                              }}
                         />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                         <Button variant="outlined" size="large">
                              Guardar
                         </Button>
                    </Grid>
               </Grid>
          </Box>
     );
};
