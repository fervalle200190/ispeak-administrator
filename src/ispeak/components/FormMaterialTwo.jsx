import { Box, Button, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { useContext } from "react";
import { postFiles, updateFiles, uploadGeneralFiles } from "../../utils";
import { DataContext } from "../context";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Material ha sido subido exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const FormMaterialTwo = () => {
     const { studyMaterial } = useContext(DataContext);
     const [studyMaterialSelected, setStudyMaterialSelected] = useState([]);
     const [files, setFiles] = useState({});
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [isLoading, setIsLoading] = useState(false);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const handleFiles = (e) => {
          setFiles({
               ...files,
               [e.target.name]: e.target.files[0],
          });
     };

     const handleChange = (event) => {
          const {
               target: { value },
          } = event;
          setStudyMaterialSelected(typeof value === "string" ? value.split(",") : value);
     };

     const studyList = useMemo(() => {
          return studyMaterial.rows
               ? studyMaterial.rows.map((study) => ({
                      label: study.name,
                      value: study.id,
                 }))
               : [];
     }, [studyMaterial]);

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (Object.keys(files).length <= 0) {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          setIsLoading(true);
          for (const file in files) {
               const name = await uploadGeneralFiles(files[file]);
               if (!name.ok) {
                    setSnackBarInfo({ ...errorSnackbar, message: name.errorMessage });
                    setIsLoading(false);
                    return;
               }
               const fileWith = {
                    fileName: name.data,
                    Ids: studyMaterialSelected,
               };
               const res = await updateFiles(file, fileWith);
               if (!res.ok) {
                    setSnackBarInfo({ ...errorSnackbar, message: name.errorMessage });
                    setIsLoading(false);
                    return;
               }
          }
          e.target.reset();
          setIsLoading(false);
          setFiles({});
          setStudyMaterialSelected([]);
          setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
     };
     return (
          <>
               <Box component="form" sx={{ pb: 10, width: "100%" }} onSubmit={handleSubmit}>
                    <Typography variant="h4">Agregar Material</Typography>
                    <Grid container>
                         <Grid item xs={12} sm={8} sx={{ m: 1, pt: 2 }}>
                              <SelectOptions
                                   options={studyList}
                                   multiple={true}
                                   value={studyMaterialSelected}
                                   handleSelect={handleChange}
                                   label={"Materiales de estudio"}
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
                                             name="PlanClases"
                                             onChange={handleFiles}
                                        />
                                   }
                                   label="Plan de estudio"
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
                                             name="MaterialAdicional1"
                                             onChange={handleFiles}
                                        />
                                   }
                                   label="Material en PDF"
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
                                             name="MaterialAdicional2"
                                             onChange={handleFiles}
                                        />
                                   }
                                   label="Material adicional"
                              />
                         </Grid>
                         <Grid item xs={12} sm={8} sx={{ m: 1, mt: 2 }}>
                              <Button size={"large"} type="submit" variant="outlined" disabled={isLoading}>
                                   Guardar
                              </Button>
                         </Grid>
                    </Grid>
               </Box>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
