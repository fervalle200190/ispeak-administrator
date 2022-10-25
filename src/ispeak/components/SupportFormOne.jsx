import { Box, Button, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { useSupportMaterialAdd } from "../../hooks";
import { postSupportMaterial } from "../../utils";
import { DataContext } from "../context";
import { kindOfSupport } from "../utils";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

const initialSnackBar = {
     isSnackBarOpen: false,
     severity: "success",
     message: "El Material de refuerzo ha sido creado exitosamente!!",
};

const errorSnackbar = {
     isSnackBarOpen: true,
     severity: "error",
     message: "Ha ocurrido un error",
};

export const SupportFormOne = () => {
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const { getSupportMaterials } = useContext(DataContext);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const {
          courseSelected,
          coursesList,
          kindOfSupportSelected,
          handleCourse,
          handleSupport,
          resetSelected,
     } = useSupportMaterialAdd();

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (courseSelected === "" || kindOfSupportSelected === "") {
               setSnackBarInfo({ ...errorSnackbar, message: "Por favor completa los datos" });
               return;
          }
          const success = []
          for (let i = 0; i < courseSelected.length; i++) {
               const dataToSend = {
                    cursoId: courseSelected[i],
                    id: 0,
                    tipoReforzamiento: kindOfSupportSelected,
               };
               const res = await postSupportMaterial(
                    JSON.stringify(dataToSend)
               );
               if(res.ok) {
                    success.push(true)
               }
          }
          if (!success[0]) {
               setSnackBarInfo({ ...errorSnackbar, message: res.errorMessage });
               return
          }
               resetSelected();
               setSnackBarInfo({ ...initialSnackBar, isSnackBarOpen: true });
               getSupportMaterials();
     };
     return (
          <Box component="form" onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                    <Grid item xs={12} sm={8}>
                         <SelectOptions
                              options={coursesList}
                              handleSelect={handleCourse}
                              value={courseSelected}
                              multiple={true}
                              label={"Curso"}
                         />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                         <SelectOptions
                              options={kindOfSupport}
                              handleSelect={handleSupport}
                              value={kindOfSupportSelected}
                              label={"Tipo de refuerzo"}
                         />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                         <Button type="submit" variant="outlined" size="large">
                              Guardar
                         </Button>
                    </Grid>
               </Grid>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </Box>
     );
};
