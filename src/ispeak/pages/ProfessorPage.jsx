import { Box } from "@mui/material";
import { useContext } from "react";
import { Datagrid, ModalAction, PageHeader } from "../components";
import { DataContext, ModalContext } from "../context";

export const ProfessorPage = () => {
     const { professors, updateProfessors, deleteProfessor } =
          useContext(DataContext);

     const { isModalOpen, handleModal, id }= useContext(ModalContext)
     const handleDelete = () => {
          deleteProfessor(id)
     };
     return (
          <>
               <ModalAction
                    isModalOpen={isModalOpen}
                    handleModal={handleModal}
                    handleAction={handleDelete}
                    title="¿Estas seguro de eliminar este profesor?"
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
                         updateHandler={updateProfessors}
                    />
               </Box>
          </>
     );
};
