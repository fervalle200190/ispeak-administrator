import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useCourseSelect, useEditStudyMaterials, useForm } from "../../hooks";
import { getUserById } from "../../utils";
import { ModalEditLayout } from "../layout/ModalEditLayout";
import { SelectOptions } from "./SelectOptions";

export const EditStudyMaterialModal = ({ isModalOpen, handleModal, id }) => {
     const { nombre, onInputChange, setFormState } = useForm({ nombre: "", curso: "" });
     const { courseSelected, coursesList, handleCourse } = useCourseSelect();
     const { modulesList, handleModule, moduleSelected } = useEditStudyMaterials(courseSelected);
     const [userData, setUserData] = useState({});

     const getUser = async () => {
          const user = await getUserById(id);
          setFormState({nombre: user.nombre})
     };

     useEffect(() => {
          if (id === "") return;
          getUser();
     }, [id]);

     return (
          <ModalEditLayout width={`50%`} isModalOpen={isModalOpen} handleModal={handleModal}>
               <Box component={"form"} sx={{ p: 5 }}>
                    <Grid container spacing={2}>
                         <Grid item xs={12}>
                              <TextField
                                   fullWidth
                                   label="Nombre"
                                   name="nombre"
                                   onChange={onInputChange}
                                   value={nombre}
                                   InputLabelProps={{
                                        className: "textfield-label",
                                   }}
                              />
                         </Grid>
                         <Grid item xs={12}>
                              <SelectOptions
                                   label={"Curso"}
                                   options={coursesList}
                                   value={courseSelected}
                                   handleSelect={handleCourse}
                              />
                         </Grid>
                         <Grid item xs={12}>
                              <SelectOptions
                                   label={"Modulo"}
                                   options={modulesList}
                                   value={moduleSelected}
                                   handleSelect={handleModule}
                              />
                         </Grid>
                         <Grid item xs={12}>
                              <Button variant="outlined" sx={{ mr: 2 }}>
                                   Guardar
                              </Button>
                              <Button variant="contained" color="error">
                                   Cancelar
                              </Button>
                         </Grid>
                    </Grid>
               </Box>
          </ModalEditLayout>
     );
};
