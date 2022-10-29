import { Box } from "@mui/material";
import { useContext } from "react";
import { useEditData } from "../../hooks";
import { deleteCourse, getCourseById, updateCourse } from "../../utils";
import {
     Datagrid,
     ModalAction,
     ModalEdit,
     PageHeader,
     SnackBarComponent,
} from "../components";
import { DataContext, ModalContext } from "../context";
import { processCourse } from "../helper";

export const CoursesPage = () => {
     const { courses, coursesChangers } = useContext(DataContext);
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
          coursesChangers.updateData,
          false,
          processCourse,
          getCourseById,
          updateCourse
     );

     const handleDelete = async () => {
          const { res } = await deleteCourse(id)
          if(!res) return
          coursesChangers.deleteData(id);
     };
     return (
          <>
               <ModalAction
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                    handleAction={handleDelete}
                    title="¿Estas seguro de eliminar este curso?"
               />
               <ModalEdit
                    isModalOpen={isModalUpdateOpen}
                    handleClose={handleCloseModal}
                    handleAction={handleAnswer}
                    title="¿Estas seguro de editar este curso?"
               />
               <PageHeader
                    title="Cursos"
                    buttonTitle="Agregar Curso"
                    url={"/courses/ingresar"}
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <Datagrid
                         rows={courses.rows}
                         columns={courses.columns}
                         updateHandler={commitHandler}
                         stopHandler={stopHandler}
                    />
               </Box>
               <SnackBarComponent
                    isSnackBarOpen={isSnackBarEditOpen}
                    handleSnackbar={handleSnackBar}
                    message="Curso editado correctamente"
               />
          </>
     );
};
