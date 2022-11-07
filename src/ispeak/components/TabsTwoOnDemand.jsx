import { Box, Button, Grid } from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import { useCourseByBusiness, useEditData } from "../../hooks";
import { deleteModule, getModuleById, updateModule } from "../../utils";
import { CourseContext, DataContext, ModalContext, ModalTabsContext } from "../context";
import { processBusinessUnit, processModule } from "../helper";
import { AddModuleModal } from "./AddModuleModal";
import { Datagrid } from "./Datagrid";
import { ModalAction } from "./ModalAction";
import { ModalEdit } from "./ModalEdit";
import { SelectOptions } from "./SelectOptions";
import { SnackBarComponent } from "./SnackBarComponent";

export const TabsTwoOnDemand = () => {
     const { modulesRaw, courseSelected, handleCourses, coursesToData, modulesChangers } =
          useContext(CourseContext);
     const { handleModal: handleModalAdd } = useContext(ModalTabsContext);
     const courseBusiness = useCourseByBusiness(modulesRaw, 4);
     const { courses } = useContext(DataContext);
     const { isModalOpen, handleModal, id } = useContext(ModalContext);

     const {
          isModalUpdateOpen,
          isSnackBarEditOpen,
          handleAnswer,
          handleSnackBar,
          commitHandler,
          stopHandler,
          handleCloseModal,
     } = useEditData(
          modulesChangers.updateData,
          false,
          processModule,
          getModuleById,
          updateModule
     );

     useEffect(() => {
       console.log(modulesRaw)
     }, [modulesRaw])
     

     const handleDelete = async () => {
          const res = await deleteModule(id)
          if(!res.ok) return
          modulesChangers.deleteData(id);
     };

     const coursesList = useMemo(() => {
          return processBusinessUnit(courses, 4)
     }, [courses]);
     return (
          <Grid container sx={{ pb: 5 }}>
               <ModalAction
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                    handleAction={handleDelete}
                    title="¿Estas seguro de eliminar este modulo?"
               />
               <ModalEdit
                    isModalOpen={isModalUpdateOpen}
                    handleClose={handleCloseModal}
                    handleAction={handleAnswer}
                    title="¿Estas seguro de editar este modulo?"
               />
               <Grid item xs={12} sm={8}>
                    <SelectOptions
                         options={courseBusiness.courses}
                         value={
                              courseBusiness.courses.length > 0
                                   ? courseSelected
                                   : ""
                         }
                         handleSelect={handleCourses}
                         label="Courses"
                    />
                    {courseSelected !== "" && (
                         <Box height={400} sx={{ mt: 4 }}>
                              <Datagrid
                                   columns={coursesToData.columns}
                                   rows={coursesToData.rows}
                                   updateHandler={commitHandler}
                                   stopHandler={stopHandler}
                              />
                         </Box>
                    )}
               </Grid>
               <Grid item xs={12} sm={4}>
                    <Button
                         variant="contained"
                         sx={{ ml: 4 }}
                         onClick={handleModalAdd}
                    >
                         Agregar Modulo
                    </Button>
               </Grid>
               <AddModuleModal
                    courses={coursesList}
                    handleModal={handleModalAdd}
               />
               <SnackBarComponent
                    isSnackBarOpen={isSnackBarEditOpen}
                    handleSnackbar={handleSnackBar}
                    message="Curso editado correctamente"
               />
          </Grid>
     );
};
