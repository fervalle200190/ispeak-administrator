import { Box, Button, Grid } from "@mui/material";
import { useContext, useState } from "react";
import { useSupportFileTable } from "../../hooks";
import { ModalTabsContext } from "../context";
import { AddFileModal } from "./AddFileModal";
import { Datagrid } from "./Datagrid";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

export const SupportFile = () => {
     const { courseSelected, coursesList, filesList, handleCourse } =
          useSupportFileTable();
     const { handleModal } = useContext(ModalTabsContext);
     const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

     const handleSnackbar = () => {
        setIsSnackBarOpen(!isSnackBarOpen);
   };
     
     return (
          <Grid container spacing={2}>
               <Grid item xs={12} sm={8}>
                    <SelectOptions
                         options={coursesList}
                         value={courseSelected}
                         handleSelect={handleCourse}
                         label='Selecciona un curso'
                    />
                    <Box height={300} sx={{ width: "100%", mt: 2 }}>
                         {filesList.columns.length > 0 && (
                              <Datagrid
                                   columns={filesList.columns}
                                   rows={filesList.rows}
                              />
                         )}
                    </Box>
               </Grid>
               <Grid item xs={12} sm={4}>
                    <Button variant="contained" onClick={handleModal}>
                         Agregar archivo
                    </Button>
               </Grid>
               <AddFileModal handleSnackbar={handleSnackbar} />
               <SnackBarComponent
                    handleSnackbar={handleSnackbar}
                    isSnackBarOpen={isSnackBarOpen}
                    message="El Archivo ha sido agregado exitosamente!!"
               />
          </Grid>
     );
};
