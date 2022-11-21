import { Box } from "@mui/material";
import {
     Datagrid,
     ModalAction,
     ModalEdit,
     PageHeader,
     SnackBarComponent,
} from "../components";
import { useContext } from "react";
import { DataContext, ModalContext } from "../context";
import { useEditData } from "../../hooks";

export const StudentsPage = () => {
     const { students, updateStudents, deleteStudent } =
          useContext(DataContext);
     const { isModalOpen, handleModal, id } = useContext(ModalContext);
     const {
          isModalUpdateOpen,
          isSnackBarEditOpen,
          handleAnswer,
          handleSnackBar,
          commitHandler,
          stopHandler,
          handleCloseModal,
     } = useEditData(updateStudents, true);

     const handleDelete = () => {
          deleteStudent(id);
     };
     return (
          <>
               <ModalAction
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                    handleAction={handleDelete}
                    title="¿Estas seguro de eliminar este alumno?"
               />
               <ModalEdit
                    isModalOpen={isModalUpdateOpen}
                    handleClose={handleCloseModal}
                    handleAction={handleAnswer}
                    title="¿Estas seguro de editar este alumno?"
               />
               <PageHeader
                    title={"Alumnos"}
                    buttonTitle={"Agregar Alumno"}
                    url={"/students/ingresar"}
               />
               <Box height={"650px"} sx={{ pr: 2 }}>
                    <Datagrid
                         rows={students.rows}
                         columns={students.columns}
                         updateHandler={commitHandler}
                         stopHandler={stopHandler}
                    />
               </Box>
               <SnackBarComponent
                    isSnackBarOpen={isSnackBarEditOpen}
                    handleSnackbar={handleSnackBar}
                    message="Usuario editado correctamente"
               />
          </>
     );
};
