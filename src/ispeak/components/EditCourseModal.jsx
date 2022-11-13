import { Box, Button, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "../../hooks";
import { getCourseById, postCourse, updateCourse } from "../../utils";
import { DataContext } from "../context";
import { ModalEditLayout } from "../layout/ModalEditLayout";
import { initialCategory } from "../utils";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialForm = {
     nombre: "",
};

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Curso ha sido editado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const EditCourseModal = ({ id, isModalOpen, closeModal }) => {
     const [professorsList, setProfessorsList] = useState([]);
     const { formState, onInputChange, onResetForm, setFormState } = useForm(initialForm);
     const [professorSelected, setProfessorSelected] = useState("");
     const [categorySelected, setCategorySelected] = useState("");
     const { professors, coursesChangers } = useContext(DataContext);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [courseRaw, setCourseRaw] = useState({});
     const [isLoading, setIsLoading] = useState(false);

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

     const fetchCourseData = async (courseId) => {
          const course = await getCourseById(courseId);
          setFormState({ ...formState, nombre: course.nombre });
          setCategorySelected(course.planEstudio);
          setCourseRaw(course);
     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (formState.nombre === courseRaw.nombre && categorySelected === courseRaw.planEstudio) {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          const dataToSend = {
               ...courseRaw,
               nombre: formState.nombre,
               planEstudio: categorySelected,
          };
          const res = await updateCourse(JSON.stringify(dataToSend));
          if (!res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return;
          }
          onResetForm();
          setProfessorSelected("");
          setCategorySelected("");
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          coursesChangers.updateData(res.data);
     };

     useEffect(() => {
          if (id === "") return;
          fetchCourseData(id);
     }, [id]);

     useEffect(() => {
          setProfessorsList(
               professors.rows.map((professor) => ({
                    value: professor.id,
                    label: professor.nameAndLastName,
               }))
          );
     }, [professors]);

     return (
          <>
               <ModalEditLayout width={"50%"} isModalOpen={isModalOpen} handleModal={closeModal}>
                    <Box component="form" sx={{ width: "100%", p: 5 }} onSubmit={handleSubmit}>
                         <Grid container>
                              <Grid item xs={12} sx={{ my: 1 }}>
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
                              {/* <Grid item xs={12} sx={{ my: 1 }}>
                                   <SelectOptions
                                        value={professorSelected}
                                        handleSelect={handleProfessor}
                                        options={professorsList}
                                        label="Profesor"
                                   />
                              </Grid> */}
                              <Grid item xs={12} sx={{ my: 1 }}>
                                   <SelectOptions
                                        value={categorySelected}
                                        handleSelect={handleCategory}
                                        options={initialCategory}
                                        label="Categoria"
                                   />
                              </Grid>
                         </Grid>
                         <Button variant="outlined" type="submit" size="large" sx={{ mt: 3 }}>
                              Agregar
                         </Button>
                         <Button
                              variant="contained"
                              onClick={closeModal}
                              size="large"
                              color="error"
                              disabled={isLoading}
                              sx={{ mt: 3, ml: 2 }}
                         >
                              Cancelar
                         </Button>
                    </Box>
               </ModalEditLayout>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
