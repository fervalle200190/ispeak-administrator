import { Box, Button, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { useMemo, useState } from "react";
import { useAddStudyMaterials, useForm } from "../../hooks";
import { postStudyMaterial, updateFiles, uploadGeneralFiles } from "../../utils";
import { DataContext } from "../context";
import { newModules, processModulesId } from "../helper";
import { CheckBoxGroup } from "./CheckBoxGroup";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialForm = {
     nombre: "",
     linkVideo: "",
};

const initialFiles = {};

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Material ha sido creado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const FormMaterialOne = () => {
     const { formState, onInputChange, onResetForm } = useForm(initialForm);
     const { getStudyMaterials } = useContext(DataContext);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [isLoading, setIsLoading] = useState(false);
     const [files, setFiles] = useState(initialFiles);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const handleFiles = (e) => {
          setFiles({
               [e.target.name]: e.target.files[0],
          });
     };

     const {
          coursesList,
          courseSelected,
          handleCourse,
          modules,
          modulesSelected,
          handleModule,
          setCourseSelected,
     } = useAddStudyMaterials();

     const moduleList = useMemo(() => {
          return newModules(courseSelected, modules, coursesList);
     }, [modules]);

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (formState.nombre === "" || formState.linkVideo === "" || files === initialFiles) {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          const dataToSend = {
               materialEstudio: {
                    Nombre: formState.nombre,
                    ModuloId: 0,
                    ClaseNumero: "0",
                    ArchivoPDF: "",
                    LinkVideo: formState.linkVideo,
                    LinkVideo2: "",
                    Activo: 1,
                    PlanClases: "",
                    MaterialAdicional1: "",
                    MaterialAdicional2: "",
                    ImagenPreview: "",
               },
               ModuloId: processModulesId(modulesSelected),
          };
          setIsLoading(true);
          const studyMaterial = await postStudyMaterial(dataToSend);
          if (!studyMaterial.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: studyMaterial.errorMessage });
               setIsLoading(false);
               return;
          }
          const name = await uploadGeneralFiles(files[`ImagenPreview`]);
          if (!name.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: name.errorMessage });
               setIsLoading(false);
               return;
          }
          const fileWith = {
               fileName: name.data,
               Ids: studyMaterial.data,
          };
          const res = await updateFiles("ImagenPreview", fileWith);
          if (!res.ok) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               setIsLoading(false);
               return;
          }
          onResetForm();
          setIsLoading(false);
          setCourseSelected([]);
          setFiles({});
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          getStudyMaterials();
          e.target.reset();
     };
     return (
          <>
               <Box
                    component={"form"}
                    sx={{
                         width: "100%",
                         pb: 10,
                         overflow: "hidden",
                         position: "relative",
                    }}
                    onSubmit={handleSubmit}
               >
                    <Grid container>
                         <Grid item xs={12} sm={8} sx={{ m: 1 }}>
                              <TextField
                                   label="Nombre"
                                   fullWidth
                                   name="nombre"
                                   value={formState.nombre}
                                   onChange={onInputChange}
                                   InputLabelProps={{
                                        className: "textfield-label",
                                   }}
                              />
                         </Grid>
                         <Grid item xs={12} sm={8} sx={{ m: 1 }}>
                              <SelectOptions
                                   options={coursesList === undefined ? [] : coursesList}
                                   label="Cursos"
                                   value={courseSelected}
                                   multiple={true}
                                   handleSelect={handleCourse}
                              />
                         </Grid>
                         <Grid item xs={12} sm={8} sx={{ m: 1 }}>
                              {modules.length > 0 ? (
                                   <CheckBoxGroup
                                        modules={moduleList}
                                        handleModule={handleModule}
                                        modulesSelected={modulesSelected}
                                        courseSelected={courseSelected}
                                        coursesList={coursesList}
                                   />
                              ) : (
                                   <Typography variant="h6" sx={{ mt: 2 }}>
                                        Por favor Selecciona un curso
                                   </Typography>
                              )}
                         </Grid>
                         <Grid item xs={12} sm={8} sx={{ m: 1, mt: 3 }}>
                              <TextField
                                   label="Link del video"
                                   fullWidth
                                   type={"url"}
                                   name="linkVideo"
                                   value={formState.linkVideo}
                                   onChange={onInputChange}
                                   InputLabelProps={{
                                        className: "textfield-label",
                                   }}
                              />
                         </Grid>
                         <Grid item xs={12} sm={8} sx={{ m: 1, ml: 2.5 }}>
                              <FormControlLabel
                                   sx={{
                                        flexDirection: "column-reverse",
                                        alignItems: "flex-start",
                                        mt: 3,
                                   }}
                                   control={
                                        <TextField
                                             type="file"
                                             name="ImagenPreview"
                                             onChange={handleFiles}
                                        />
                                   }
                                   label="Imagen del video"
                              />
                         </Grid>
                         <Grid item xs={12} sm={8} sx={{ m: 1 }}>
                              <Button
                                   size={"large"}
                                   type="submit"
                                   variant="outlined"
                                   disabled={isLoading}
                              >
                                   Guardar
                              </Button>
                         </Grid>
                    </Grid>
               </Box>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
