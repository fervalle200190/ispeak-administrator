import { Box } from "@mui/material";
import { Datagrid, ModalAction, PageHeader } from "../components";
import { useContext } from "react";
import { DataContext, ModalContext } from "../context";

export const StudentsPage = () => {
     const { students, updateStudents, deleteStudent } =
          useContext(DataContext);
     const { isModalOpen, handleModal, id } = useContext(ModalContext);

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
               <PageHeader
                    title={"Alumnos"}
                    buttonTitle={"Agregar Alumno"}
                    url={"/students/ingresar"}
               />
               <Box height={"100vh"} sx={{ pr: 2 }}>
                    <Datagrid
                         rows={students.rows}
                         columns={students.columns}
                         updateHandler={updateStudents}
                    />
               </Box>
          </>
     );
};
