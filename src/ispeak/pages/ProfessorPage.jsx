import { Box } from "@mui/material";
import { useContext } from "react";
import { useEditData } from "../../hooks";
import { Datagrid, ModalAction, ModalEdit, PageHeader, SnackBarComponent } from "../components";
import { DataContext, ModalContext } from "../context";

export const ProfessorPage = () => {
     const { professors, updateProfessors, deleteProfessor } =
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
     } = useEditData(updateProfessors, true);

     const handleDelete = () => {
          deleteProfessor(id);
     };
     return (
          <>
               <ModalAction
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                    handleAction={handleDelete}
                    title="¿Estas seguro de eliminar este profesor?"
               />
               <ModalEdit
                    isModalOpen={isModalUpdateOpen}
                    handleClose={handleCloseModal}
                    handleAction={handleAnswer}
                    title="¿Estas seguro de editar este profesor?"
               />
               <PageHeader
                    title={"Profesores"}
                    buttonTitle={"Agregar Profesor"}
                    url={"/professor/ingresar"}
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <Datagrid
                         rows={professors.rows}
                         columns={professors.columns}
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
