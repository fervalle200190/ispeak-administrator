import { Box, Button, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { useSupportMaterialAdd } from "../../hooks";
import { postSupportMaterial } from "../../utils";
import { DataContext } from "../context";
import { kindOfSupport } from "../utils";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

export const SupportFormOne = () => {
     const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
     const { getSupportMaterials } = useContext(DataContext);

     const handleSnackbar = () => {
          setIsSnackBarOpen(!isSnackBarOpen);
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
               if(res.id !== 0) {
                    success.push(true)
               }
          }
          if (success[0]) {
               resetSelected();
               handleSnackbar();
               getSupportMaterials();
          }
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
               <SnackBarComponent
                    handleSnackbar={handleSnackbar}
                    isSnackBarOpen={isSnackBarOpen}
                    message="El Material ha sido creado exitosamente!!"
               />
          </Box>
     );
};
