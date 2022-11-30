import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useCourseSelect, useEditStudyMaterials, useForm } from "../../hooks";
import { updateImagePreview, updateStudyMaterial } from "../../utils";
import { getStudyMaterialById } from "../../utils/getStudyMaterialById";
import { processStudyMaterial } from "../helper";
import { ModalEditLayout } from "../layout/ModalEditLayout";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El material de estudio ha sido editado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const EditStudyMaterialModal = ({
     isModalOpen,
     handleModal,
     id,
     studyMaterialsChangers,
     totalStudyMaterial,
}) => {
     const { nombre, linkVideo, onInputChange, setFormState } = useForm({
          nombre: "",
          linkVideo: "",
     });
     const { courseSelected, coursesList, handleCourse } = useCourseSelect();
     const { modulesList, handleModule, moduleSelected, handleClaseSelected, claseSelected } =
          useEditStudyMaterials(courseSelected);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [materialData, setMaterialData] = useState({});
     const [file, setFile] = useState("");
     const [isLoading, setIsLoading] = useState(false);

     const classStudy = useMemo(() => {
          return [...Array(totalStudyMaterial ? parseInt(totalStudyMaterial) : 0)].map(
               (item, i) => ({
                    label: `Clase ${i + 1}`,
                    value: i + 1,
               })
          );
     }, [totalStudyMaterial]);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const handleFile = (e) => {
          setFile(e.target.files[0]);
     };

     const getMaterial = async () => {
          const { data: material } = await getStudyMaterialById(id);
          setMaterialData(material);
          handleCourse({ target: { value: material.cursoId } });
          handleModule({ target: { value: material.moduloId } });
          handleClaseSelected({ target: { value: material.claseNumero } });
          setFormState({ nombre: material.nombre, linkVideo: material.linkVideo });
     };

     useEffect(() => {
          if (id === "") return;
          getMaterial();
     }, [id]);

     const onSubmit = async (e) => {
          e.preventDefault();
          if (
               courseSelected === materialData.cursoId &&
               moduleSelected === materialData.moduloId &&
               nombre === materialData.nombre &&
               claseSelected === materialData.claseNumero &&
               linkVideo === materialData.linkVideo &&
               file === ""
          ) {
               setSnackBarInfo({
                    ...errorSnackbar,
                    message: "Por favor cambia algunos de los datos para editar",
               });
               return;
          }
          setIsLoading(true);
          if (
               courseSelected !== materialData.cursoId ||
               moduleSelected !== materialData.moduloId ||
               claseSelected === materialData.claseNumero ||
               linkVideo === materialData.linkVideo ||
               nombre !== materialData.nombre
          ) {
               const res = await updateStudyMaterial(
                    processStudyMaterial({
                         materialData,
                         courseSelected,
                         moduleSelected,
                         claseSelected,
                         linkVideo,
                         nombre,
                    })
               );
               if (!res.ok) {
                    setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
                    setIsLoading(false);
                    return;
               }
               setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
               studyMaterialsChangers.updateDataWithModal({
                    id: materialData.id,
                    name: nombre,
                    course: coursesList.find((course) => course.value === courseSelected).label,
                    module: modulesList.find((mod) => mod.value === moduleSelected).label,
                    class: claseSelected,
                    active: materialData.activo ? "Activo" : "No Activo",
               });
               getMaterial()
          }
          if (file !== "") {
               const res = await updateImagePreview(materialData.id, file);
               if (!res.ok) {
                    setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
                    setIsLoading(false);
                    return;
               }
               setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
          }
          setIsLoading(false);
     };

     return (
          <>
               <ModalEditLayout width={`50%`} isModalOpen={isModalOpen} handleModal={handleModal}>
                    <Box component={"form"} sx={{ p: 5 }} onSubmit={onSubmit}>
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
                                        value={modulesList.length <= 0 ? "" : moduleSelected}
                                        handleSelect={handleModule}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <SelectOptions
                                        label={"Clase"}
                                        options={classStudy}
                                        value={claseSelected}
                                        handleSelect={handleClaseSelected}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <TextField
                                        fullWidth
                                        label="Link del video"
                                        name="linkVideo"
                                        onChange={onInputChange}
                                        value={linkVideo}
                                        InputLabelProps={{
                                             className: "textfield-label",
                                        }}
                                   />
                              </Grid>
                              <Grid item xs={12}>
                                   <TextField type={"file"} onChange={handleFile} />
                              </Grid>
                              <Grid item xs={12}>
                                   <Button
                                        variant="outlined"
                                        sx={{ mr: 2 }}
                                        type="submit"
                                        disabled={isLoading}
                                   >
                                        Guardar
                                   </Button>
                                   <Button
                                        variant="contained"
                                        onClick={handleModal}
                                        color="error"
                                        disabled={isLoading}
                                   >
                                        Cancelar
                                   </Button>
                              </Grid>
                         </Grid>
                    </Box>
               </ModalEditLayout>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
