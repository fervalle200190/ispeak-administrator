import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { useCourseSelect } from "../../hooks";
import { postProfessorsByCourse } from "../../utils";
import { DataContext } from "../context";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "Los profesores han sido agregados exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const TabOneProfessors = () => {
     const { coursesList, courseSelected, handleCourse, resetCourse } = useCourseSelect();
     const { professors } = useContext(DataContext);
     const [professorsSelected, setProfessorsSelected] = useState([]);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [isLoading, setIsLoading] = useState(false);

     const handleProfessors = (e) => {
          setProfessorsSelected(e.target.value);
     };

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const professorsList = useMemo(() => {
          return professors.rows.map((prof) => ({ label: prof.nameAndLastName, value: prof.id }));
     }, [professors.rows]);

     const onSubmit = async (e) => {
          e.preventDefault();
          if (courseSelected === "" || professorsSelected.length <= 0) {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          const res = await postProfessorsByCourse({
               profesores: professorsSelected,
               cursoid: courseSelected,
          });
          if (!res.ok) {
               return setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
          }
          resetCourse();
          setProfessorsSelected([]);
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          setIsLoading(true);
     };
     return (
          <>
               <Typography variant="h6" mt={3}>
                    Agregar profesor
               </Typography>
               <Box component="form" onSubmit={onSubmit}>
                    <Grid container>
                         <Grid item xs={12} sm={7} sx={{ m: 1 }}>
                              <SelectOptions
                                   value={courseSelected}
                                   handleSelect={handleCourse}
                                   options={coursesList}
                                   label="Categoria"
                              />
                         </Grid>
                         <Grid item xs={12} sm={7} sx={{ m: 1 }}>
                              <SelectOptions
                                   value={professorsSelected}
                                   handleSelect={handleProfessors}
                                   multiple={true}
                                   options={professorsList}
                                   label="Profesores"
                              />
                         </Grid>
                         <Grid item xs={12} sm={7} sx={{ m: 1 }}>
                              <Button variant="outlined" type="submit" size="large">
                                   Guardar
                              </Button>
                         </Grid>
                    </Grid>
               </Box>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
