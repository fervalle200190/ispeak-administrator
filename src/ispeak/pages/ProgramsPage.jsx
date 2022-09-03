import { Box } from "@mui/material";
import { useContext } from "react";
import { useEditData } from "../../hooks";
import { deleteProgram, getProgramById, updateProgram } from "../../utils";
import {
     Datagrid,
     ModalAction,
     ModalEdit,
     PageHeader,
     SnackBarComponent,
} from "../components";
import { DataContext, ModalContext } from "../context";
import { processProgramSend } from "../helper";

export const ProgramsPage = () => {
     const { programs, updatePrograms, deletePrograms } =
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
     } = useEditData(
          updatePrograms,
          false,
          processProgramSend,
          getProgramById,
          updateProgram
     );

     const handleAction = async () => {
          const res = await deleteProgram(id)
          deletePrograms(id);
     };
     return (
          <>
               <ModalEdit
                    isModalOpen={isModalUpdateOpen}
                    handleClose={handleCloseModal}
                    handleAction={handleAnswer}
                    title="¿Estas seguro de editar este profesor?"
               />
               <PageHeader
                    title={"Programas Educativos"}
                    buttonTitle={"Agregar Programa"}
                    url={"/programs/ingresar"}
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <Datagrid
                         rows={programs.rows}
                         columns={programs.columns}
                         updateHandler={commitHandler}
                         stopHandler={stopHandler}
                    />
               </Box>
               <ModalAction
                    title={"¿Estas seguro de eliminar este programa?"}
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                    handleAction={handleAction}
               />
               <SnackBarComponent
                    isSnackBarOpen={isSnackBarEditOpen}
                    handleSnackbar={handleSnackBar}
                    message="Programa editado correctamente"
               />
          </>
     );
};
