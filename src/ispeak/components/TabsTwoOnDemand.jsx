import { Box, Button, Grid } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { useCourseByBusiness, useEditData } from "../../hooks";
import { deleteModule, getModuleById, updateModule } from "../../utils";
import { CourseContext, DataContext, ModalContext, ModalTabsContext } from "../context";
import { processBusinessUnit, processModule } from "../helper";
import { AddModuleModal } from "./AddModuleModal";
import { DataGridWithModal } from "./DataGridWithModal";
import { EditModuleModal } from "./EditModuleModal";
import { ModalAction } from "./ModalAction";
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

export const TabsTwoOnDemand = () => {
     const { modulesRaw, courseSelected, handleCourses, coursesToData, modulesChangers } =
          useContext(CourseContext);
     const { handleModal: handleModalAdd } = useContext(ModalTabsContext);
     const courseBusiness = useCourseByBusiness(modulesRaw, 4);
     const { courses } = useContext(DataContext);
     const [snackBarInfo, setSnackBarInfo] = useState(initialSnackBar);
     const [isModalEditOpen, setIsModalEditOpen] = useState(false);
     const [onEditId, setOnEditId] = useState("");
     const { isModalOpen, handleModal, id } = useContext(ModalContext);

     const closeSnackbar = () => {
          setSnackBarInfo({
               ...snackBarInfo,
               isSnackBarOpen: false,
          });
     };

     const handleDelete = async () => {
          const res = await deleteModule(id);
          if (!res.ok) return setSnackBarInfo({ ...errorSnackbar, message: 'Ha ocurrido un error' });
          modulesChangers.deleteData(id);
          setSnackBarInfo({
               ...initialSnackBar,
               isSnackBarOpen: true,
               message: "El modulo ha sido eliminado correctamente!!!",
          });
     };

     const coursesList = useMemo(() => {
          return processBusinessUnit(courses, 4);
     }, [courses]);

     const openModal = ({ id }) => {
          setOnEditId(id);
          setIsModalEditOpen(true);
     };

     const closeModal = () => {
          setIsModalEditOpen(false);
     };
     return (
          <>
               <EditModuleModal
                    isModalOpen={isModalEditOpen}
                    closeModal={closeModal}
                    id={onEditId}
               />
               <Grid container sx={{ pb: 5 }}>
                    <ModalAction
                         isModalOpen={isModalOpen}
                         handleModal={handleModal}
                         handleAction={handleDelete}
                         title="¿Estas seguro de eliminar este modulo?"
                    />
                    <Grid item xs={12} sm={8}>
                         <SelectOptions
                              options={courseBusiness.courses}
                              value={courseBusiness.courses.length > 0 ? courseSelected : ""}
                              handleSelect={handleCourses}
                              label="Courses"
                         />
                         {courseSelected !== "" && (
                              <Box height={400} sx={{ mt: 4 }}>
                                   <DataGridWithModal
                                        columns={coursesToData.columns}
                                        rows={coursesToData.rows}
                                        handleCell={openModal}
                                        onChangeElements={() => {}}
                                   />
                              </Box>
                         )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                         <Button variant="contained" sx={{ ml: 4 }} onClick={handleModalAdd}>
                              Agregar Modulo
                         </Button>
                    </Grid>
                    <AddModuleModal courses={coursesList} handleModal={handleModalAdd} />
               </Grid>
               <SnackBarComponent handleSnackbar={closeSnackbar} {...snackBarInfo} />
          </>
     );
};
