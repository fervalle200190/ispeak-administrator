import { Box, Button, Grid, TextField } from "@mui/material";
import { useCoursesByBusinessList } from "../../hooks";
import { SelectOptions } from "./SelectOptions";

export const SignUpFormOnDemand = () => {
     const { courses, courseSelected, handleCourse } =
          useCoursesByBusinessList(4);
     return (
          <Box component="form">
               <Grid container spacing={1}>
                    <Grid item xs={12} sm={7}>
                         <SelectOptions options={courses} label="Alumno" />
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
